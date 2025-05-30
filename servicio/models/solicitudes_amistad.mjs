import db from "../config/db.mjs";

function getMySQLDate() {
  const now = new Date();

  const pad = n => n.toString().padStart(2, '0');
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); 
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export class solicitud_amistad {
    constructor(id_remitente, id_destinatario, estado, fecha_solicitud = getMySQLDate(), id_solicitud = 0){
        this.id_solicitud = id_solicitud;
        this.id_remitente = id_remitente;
        this.id_destinatario = id_destinatario;
        this.estado = estado;
        this.fecha_solicitud = fecha_solicitud;
        }
}

export const nuevaSolicitud = async (id_remitente, id_destinatario) => {
  const estado = 'pendiente';
  const fecha_solicitud = getMySQLDate();

  try {
    // verificamos las peticiones de los ultimos 7 dias
    const [rows] = await db.query(`
      SELECT id_solicitud FROM solicitudes_amistad 
      WHERE id_remitente = ? AND id_destinatario = ?
        AND fecha_solicitud >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    `, [id_remitente, id_destinatario]);

    if (rows.length > 0) {
      return {
        success: false,
        message: 'Ya has enviado una solicitud de amistad a este usuario en los últimos 7 días.'
      };
    }

    // Si no tiene ninguna inserta
    const [result] = await db.query(`
      INSERT INTO solicitudes_amistad (id_remitente, id_destinatario, estado, fecha_solicitud)
      VALUES (?, ?, ?, ?)
    `, [id_remitente, id_destinatario, estado, fecha_solicitud]);

    return {
      success: true,
      id_solicitud: result.insertId
    };
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    return {
      success: false,
      message: 'No se pudo crear la solicitud por un error interno.'
    };
  }
};

export const getIsPendienteIds = async (id_usuario_actual, id_otro_usuario) => {
  try {
    const [rows] = await db.query(
      `
      SELECT id_solicitud, id_remitente, id_destinatario
      FROM solicitudes_amistad
      WHERE estado = 'pendiente'
        AND (
          (id_remitente = ? AND id_destinatario = ?)
          OR
          (id_remitente = ? AND id_destinatario = ?)
        )
      `,
      [id_usuario_actual, id_otro_usuario, id_otro_usuario, id_usuario_actual]
    );

    if (rows.length === 0) {
      return 0;
    }

    const solicitud = rows[0];
    const estado = solicitud.id_remitente === id_usuario_actual ? 1 : 2;

    return {
      id_solicitud: solicitud.id_solicitud,
      estado
    };
  } catch (error) {
    console.error('Error al obtener estado de solicitud de amistad:', error);
    return null;
  }
};



export const getSolicitudesEnviadasUsuario = async (email) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        sa.id_solicitud,
        sa.estado,
        sa.fecha_solicitud,

        u_destinatario.id_usuario AS id_destinatario,
        u_destinatario.nombre_usuario AS nombre_destinatario,
        u_destinatario.email AS email_destinatario,
        u_destinatario.avatar AS avatar_destinatario

      FROM solicitudes_amistad sa
      INNER JOIN usuario u_remitente ON sa.id_remitente = u_remitente.id_usuario
      INNER JOIN usuario u_destinatario ON sa.id_destinatario = u_destinatario.id_usuario
      WHERE u_remitente.email = ?
      ORDER BY sa.fecha_solicitud DESC
    `, [email]);

    return rows;
  } catch (error) {
    console.error('Error al obtener solicitudes enviadas:', error);
    return [];
  }
};

export const rechazarSolicitud = async (id_solicitud) => {
  try {
    const [result] = await db.query(`
      UPDATE solicitudes_amistad
      SET estado = 'cancelada'
      WHERE id_solicitud = ?
    `, [id_solicitud]);

    return {
      success: result.affectedRows > 0,
      message: result.affectedRows > 0
        ? 'Solicitud rechazada correctamente.'
        : 'No se encontró la solicitud:'+ id_solicitud
    };
  } catch (error) {
    console.error('Error al rechazar solicitud:', error);
    return {
      success: false,
      message: 'Error al procesar la solicitud.'
    };
  }
};

export const aceptarSolicitud = async (id_solicitud) => {
  try {
    const [updateResult] = await db.query(`
      UPDATE solicitudes_amistad
      SET estado = 'aceptada'
      WHERE id_solicitud = ?
    `, [id_solicitud]);

    if (updateResult.affectedRows === 0) {
      return {
        success: false,
        message: 'No se encontró la solicitud: ' + id_solicitud
      };
    }

    // Obtener id_remitente e id_destinatario de la solicitud aceptada
    const [rows] = await db.query(`
      SELECT id_remitente, id_destinatario
      FROM solicitudes_amistad
      WHERE id_solicitud = ?
    `, [id_solicitud]);

    if (rows.length === 0) {
      return {
        success: false,
        message: 'Solicitud no encontrada después de actualizar: ' + id_solicitud
      };
    }

    const { id_remitente, id_destinatario } = rows[0];

    // Ordenar los ids para cumplir con la restricción CHECK (id_usuario_1 < id_usuario_2)
    const id_usuario_1 = Math.min(id_remitente, id_destinatario);
    const id_usuario_2 = Math.max(id_remitente, id_destinatario);

    
    await db.query(`
      INSERT INTO usuarios_amistades (id_usuario_1, id_usuario_2, fecha_amistad)
      VALUES (?, ?, CURDATE())
    `, [id_usuario_1, id_usuario_2]);

    return {
      success: true,
      message: 'Solicitud aceptada y amistad creada correctamente.'
    };
  } catch (error) {
    console.error('Error al aceptar solicitud y crear amistad:', error);
    return {
      success: false,
      message: 'Error al procesar la solicitud.'
    };
  }
};



/** 
 * -- SOLICITUDES ENVIADAS POR EL USUARIO--
 * Revisa las solicitudes enviadas por el usuario, si han pasado
 * 7 dias las cancela
 * 
*/
export const revisarSolicitudesEnviadas = async (id_remitente) => {
  try {
    // Actualizar solicitudes pendientes > 7 días a 'cancelada'
    await db.query(`
      UPDATE solicitudes_amistad
      SET estado = 'cancelada'
      WHERE id_remitente = ?
        AND estado = 'pendiente'
        AND fecha_solicitud < (NOW() - INTERVAL 7 DAY)
    `, [id_remitente]);

    // Devolver solo las solicitudes pendientes tras la actualización
    const [rows] = await db.query(`
      SELECT 
        sa.id_solicitud,
        sa.estado,
        sa.fecha_solicitud,
        u_destinatario.id_usuario AS id_destinatario,
        u_destinatario.nombre_usuario AS nombre_destinatario,
        u_destinatario.email AS email_destinatario,
        u_destinatario.avatar AS avatar_destinatario
      FROM solicitudes_amistad sa
      INNER JOIN usuario u_destinatario ON sa.id_destinatario = u_destinatario.id_usuario
      WHERE sa.id_remitente = ? AND sa.estado = 'pendiente'
      ORDER BY sa.fecha_solicitud DESC
    `, [id_remitente]);
    
    return rows;
  } catch (error) {
    console.error('Error al revisar solicitudes pendientes:', error);
    return [];
  }
};


/** 
 * -- SOLICITUDES RECIBIDAS POR EL USUARIO--
 * Igual que el anterior pero al reves, revisa las peticiones
 * que te han enviado, si alguna tiene mas de 7 dias se cancela automaitcamente
 * 
*/
export const revisarSolicitudesRecibidas = async (id_destinatario) => {
  try {
    // Actualizar solicitudes pendientes > 7 días a 'cancelada'
    await db.query(`
      UPDATE solicitudes_amistad
      SET estado = 'cancelada'
      WHERE id_destinatario = ?
        AND estado = 'pendiente'
        AND fecha_solicitud < (NOW() - INTERVAL 7 DAY)
    `, [id_destinatario]);

    // Devolver solo las solicitudes pendientes tras la actualización
    const [rows] = await db.query(`
      SELECT 
        sa.id_solicitud,
        sa.estado,
        sa.fecha_solicitud,
        u_remitente.id_usuario AS id_remitente,
        u_remitente.nombre_usuario AS nombre_remitente,
        u_remitente.email AS email_remitente,
        u_remitente.avatar AS avatar_remitente
      FROM solicitudes_amistad sa
      INNER JOIN usuario u_remitente ON sa.id_remitente = u_remitente.id_usuario
      WHERE sa.id_destinatario = ? AND sa.estado = 'pendiente'
      ORDER BY sa.fecha_solicitud DESC
    `, [id_destinatario]);

    return rows;
  } catch (error) {
    console.error('Error al revisar solicitudes recibidas:', error);
    return [];
  }
};
