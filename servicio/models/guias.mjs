import db from "../config/db.mjs";

function getMySQLDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());

  return `${year}-${month}-${day}`;  
}

export const insertGuia = async (id_usuario, id_juego, campeon_nombre, contenido_guia, privada) => {
  try {
      const fecha_solicitud = getMySQLDate();
      const [result] = await db.query(`
      INSERT INTO guias (id_usuario, id_juego, campeon_nombre, contenido_guia, fecha, privada)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [id_usuario, id_juego, campeon_nombre, JSON.stringify(contenido_guia), fecha_solicitud, privada]);

      return { id_guia: result.insertId };
  } catch (error) {
      console.error("Error al insertar la guía:", error);
      throw error;
  }
};

export const getGuias = async () => {
  try {
    const [rows] = await db.query(`
      SELECT 
        g.id_guia,
        g.id_usuario,
        u.nombre_usuario,
        u.email,
        g.id_juego,
        g.campeon_nombre,
        g.contenido_guia,
        g.fecha,
        g.privada
      FROM guias g
      INNER JOIN usuario u ON g.id_usuario = u.id_usuario
      WHERE g.privada = 0
      ORDER BY g.fecha DESC
    `);

    return rows;

  } catch (error) {
    console.error("Error al obtener las guías públicas:", error);
    throw error;
  }
};

export const getGuiasByCampeon = async (campeonNombre) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        g.id_guia,
        g.id_usuario,
        u.nombre_usuario,
        u.email,
        g.id_juego,
        g.campeon_nombre,
        g.contenido_guia,
        g.fecha,
        g.privada
      FROM guias g
      INNER JOIN usuario u ON g.id_usuario = u.id_usuario
      WHERE g.privada = 0 AND g.campeon_nombre = ?
      ORDER BY g.fecha DESC
    `, [campeonNombre]);

    return rows;

  } catch (error) {
    console.error("Error al obtener las guías por campeón:", error);
    throw error;
  }
};


export const getGuiasByUsuario = async (id_usuario) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        g.id_guia,
        g.id_usuario,
        u.nombre_usuario,
        u.email,
        g.id_juego,
        g.campeon_nombre,
        g.contenido_guia,
        g.fecha,
        g.privada
      FROM guias g
      INNER JOIN usuario u ON g.id_usuario = u.id_usuario
      WHERE g.id_usuario = ?
      ORDER BY g.fecha DESC
    `, [id_usuario]);

    return rows;

  } catch (error) {
    console.error("Error al obtener guías por usuario:", error);
    throw error;
  }
};