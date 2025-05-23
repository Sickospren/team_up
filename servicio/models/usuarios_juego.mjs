import db from "../config/db.mjs";

export class Juego {
    constructor(id_usuario, id_juego, game_tag, datos_extra_juego) {
        this.id_usuario = id_usuario;
        this.id_juego = id_juego;
        this.game_tag = game_tag;
        this.datos_extra_juego = datos_extra_juego;
    }
}

// Devuelve los usuarios de un juego en concreto 
export const getUsuariosPorJuego = async (idJuego) => {
  const [registros] = await db.query(
    `SELECT 
      u.id_usuario,
      u.id_oauth,
      u.nombre_usuario,
      u.nombre_usuario_app,
      u.avatar,
      u.proveedor,
      u.email,
      u.fecha_registro,
      uj.game_tag,
      uj.datos_extra_juego
    FROM usuarios_juego uj
    JOIN usuario u ON uj.id_usuario = u.id_usuario
    WHERE uj.id_juego = ?`,
    [idJuego]
  );

  return registros;
};


export const guardarUsuarioJuego = async (idUsuario, idJuego, gameTag, datosExtraJuego = {}) => {
  try {
    // Comprobar si ya existe el usuario en ese juego
    const [existe] = await db.query(
      `SELECT 1 FROM usuarios_juego WHERE id_usuario = ? AND id_juego = ?`,
      [idUsuario, idJuego]
    );

    if (existe.length > 0) {
      // Ya existe => actualizar
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
      // No existe => insertar
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


export const existeGameTag = async (gameTag) => {
  try {
    const [registros] = await db.query(
      `SELECT 1 FROM usuarios_juego WHERE game_tag = ? LIMIT 1`,
      [gameTag]
    );

    return registros.length > 0; // true si ya existe, false si está libre
  } catch (error) {
    console.error('Error al comprobar game_tag:', error.message);
    return false; // O lanza un error si prefieres
  }
};


