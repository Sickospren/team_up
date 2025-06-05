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
      SELECT id_guia, id_usuario, id_juego, campeon_nombre, contenido_guia, fecha, privada
      FROM guias
      WHERE privada = 0
      ORDER BY fecha DESC
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
      SELECT id_guia, id_usuario, id_juego, campeon_nombre, contenido_guia, fecha, privada
      FROM guias
      WHERE privada = 0 AND campeon_nombre = ?
      ORDER BY fecha DESC
    `, [campeonNombre]);

    return rows;

  } catch (error) {
    console.error("Error al obtener las guías públicas por campeón:", error);
    throw error;
  }
};


export const getGuiasByUsuario = async (id_usuario) => {
  try {
    const [rows] = await db.query(`
      SELECT id_guia, id_usuario, id_juego, campeon_nombre, contenido_guia, fecha, privada
      FROM guias
      WHERE id_usuario = ?
      ORDER BY fecha DESC
    `, [id_usuario]);

    return rows;

  } catch (error) {
    console.error("Error al obtener guías por usuario:", error);
    throw error;
  }
};