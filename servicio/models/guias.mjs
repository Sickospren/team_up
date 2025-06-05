import db from "../config/db.mjs";

function getMySQLDate() {
  const now = new Date();

  const pad = n => n.toString().padStart(2, '0');
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