import db from "../config/db.mjs";

export class Juego {
  constructor(id_usuario, id_juego, game_tag, datos_extra_juego) {
    this.id_usuario = id_usuario;
    this.id_juego = id_juego;
    this.game_tag = game_tag;
    this.datos_extra_juego = datos_extra_juego;
  }
}

// Función que ya no se usa, pero se deja comentada:
// export const getUsuariosPorJuego = async (idJuego) => {
//   const [registros] = await db.query(
//     `SELECT 
//       u.id_usuario,
//       u.nombre_usuario,
//       u.nombre_usuario_app,
//       u.avatar,
//       u.email,
//       uj.game_tag,
//       uj.datos_extra_juego,
//       j.id_juego,
//       j.nombre AS nombre_juego
//     FROM usuarios_juego uj
//     JOIN usuario u ON uj.id_usuario = u.id_usuario
//     JOIN juegos j ON uj.id_juego = j.id_juego
//     WHERE uj.id_juego = ?`,
//     [idJuego]
//   );

//   return registros;
// };

export const getJuegosPorUsuario = async (idUsuario) => {
  const [registros] = await db.query(
    `SELECT 
      j.foto_juego,
      j.nombre AS nombre_juego,
      uj.game_tag,
      uj.datos_extra_juego
    FROM usuarios_juego uj
    JOIN juegos j ON uj.id_juego = j.id_juego
    WHERE uj.id_usuario = ?`,
    [idUsuario]
  );

  return registros;
};


export const guardarUsuarioJuego = async (idUsuario, idJuego, gameTag, datosExtraJuego = {}) => {
  try {
    const [existe] = await db.query(
      `SELECT 1 FROM usuarios_juego WHERE id_usuario = ? AND id_juego = ?`,
      [idUsuario, idJuego]
    );

    if (existe.length > 0) {
      const [resultado] = await db.query(
        `UPDATE usuarios_juego
         SET game_tag = ?, datos_extra_juego = ?
         WHERE id_usuario = ? AND id_juego = ?`,
        [gameTag, JSON.stringify(datosExtraJuego), idUsuario, idJuego]
      );

      return {
        actualizado: true,
        mensaje: "Usuario actualizado en el juego."
      };
    } else {
      const [resultado] = await db.query(
        `INSERT INTO usuarios_juego (id_usuario, id_juego, game_tag, datos_extra_juego)
         VALUES (?, ?, ?, ?)`,
        [idUsuario, idJuego, gameTag, JSON.stringify(datosExtraJuego)]
      );

      return {
        insertado: true,
        mensaje: "Usuario añadido al juego correctamente."
      };
    }
  } catch (error) {
    console.error("Error en guardarUsuarioJuego:", error.message);
    return { error: true, mensaje: error.message };
  }
};

export const deleteUsuarioJuego = async (idUsuario, idJuego) => {
  try {
    const [resultado] = await db.query(
      `DELETE FROM usuarios_juego
       WHERE id_usuario = ? AND id_juego = ?`,
      [idUsuario, idJuego]
    );

    return {
      eliminado: resultado.affectedRows > 0,
      mensaje: resultado.affectedRows > 0
        ? 'Usuario eliminado del juego correctamente.'
        : 'No se encontró ninguna relación entre el usuario y el juego.'
    };
  } catch (error) {
    console.error('Error al eliminar usuario del juego:', error.message);
    return { eliminado: false, error: error.message };
  }
};

export const getUsuarioJuego = async (idUsuario, idJuego) => {
  const [rows] = await db.query(
    `SELECT *
     FROM usuarios_juego
     WHERE id_usuario = ? AND id_juego = ?`,
    [idUsuario, idJuego]
  );
  return rows.length > 0 ? rows[0] : null;
};


export const getUsuariosJuegos = async() =>{

  const [usuarios] = await db.query(`SELECT * FROM usuario`);

  for (const usuario of usuarios) {
    const [juegos] = await db.query(
      `SELECT id_juego FROM usuarios_juego WHERE id_usuario = ?`, 
      [usuario.id_usuario]
    );
    usuario.juegos = juegos.map(j => j.id_juego)
  }

  return usuarios;

}

// Función que ya no se usa, pero se deja comentada:
// export const existeGameTag = async (gameTag) => {
//   const [result] = await db.query(
//     `SELECT COUNT(*) AS count FROM usuarios_juego WHERE game_tag = ?`,
//     [gameTag]
//   );
//   return result[0].count > 0;
// };
