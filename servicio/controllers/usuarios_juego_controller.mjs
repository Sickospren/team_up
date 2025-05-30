import {
  getJuegosPorUsuario,
  guardarUsuarioJuego,
  deleteUsuarioJuego,
  getUsuarioJuego,
  // getUsuariosPorJuego,
  // existeGameTag
} from "../models/usuarios_juego.mjs";

// Controlador que ya no se usa, pero se deja comentado:
// export const getAllUsuariosJuego = async (req, res) => {
//   try {
//     const usuarios = await getUsuariosJuego();
//     res.status(200).json({
//       success: true,
//       data: usuarios
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       mensaje: error.message
//     });
//   }
// };

export const getJuegosUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res.status(400).json({
      success: false,
      mensaje: "Falta el parámetro id_usuario"
    });
  }

  try {
    const juegos = await getJuegosPorUsuario(id_usuario);

    return res.status(200).json({
      success: true,
      data: juegos
    });
  } catch (error) {
    console.error("Error al obtener juegos del usuario:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const insertUsuario = async (req, res) => {
  const { id_juego, id_usuario, game_tag, datosExtraJuego } = req.body;

  if (!id_juego || !id_usuario || !game_tag) {
    return res.status(400).json({
      success: false,
      mensaje: "Faltan parámetros: se requiere 'id_juego', 'id_usuario' y 'game-tag'."
    });
  }

  try {
    const resultado = await guardarUsuarioJuego(id_usuario, id_juego, game_tag, datosExtraJuego || {});

    if (resultado.error) {
      return res.status(500).json({
        success: false,
        mensaje: "Error al guardar el usuario en el juego.",
        error: resultado.mensaje
      });
    }

    return res.status(200).json({
      success: true,
      ...resultado
    });

  } catch (error) {
    console.error("Error inesperado en insertUsuario:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error inesperado en el servidor.",
      error: error.message
    });
  }
};

export const eliminarUsuarioJuego = async (req, res) => {
  const { id_usuario, id_juego } = req.body;

  if (!id_usuario || !id_juego) {
    return res.status(400).json({
      success: false,
      mensaje: "Faltan parámetros: se requiere 'id_usuario' e 'id_juego'."
    });
  }

  try {
    const resultado = await deleteUsuarioJuego(id_usuario, id_juego);

    if (resultado.error) {
      return res.status(500).json({
        success: false,
        mensaje: "Error al eliminar la relación usuario-juego.",
        error: resultado.error
      });
    }

    return res.status(200).json({
      success: resultado.eliminado,
      mensaje: resultado.mensaje
    });

  } catch (error) {
    console.error("Error inesperado al eliminar usuario-juego:", error.message);
    return res.status(500).json({
      success: false,
      mensaje: "Error inesperado del servidor.",
      error: error.message
    });
  }
};

export const getUsuarioPorJuego = async (req, res) => {
  const { id_juego, id_usuario } = req.params;

  if (!id_usuario || !id_juego) {
    return res.status(400).json({
      success: false,
      mensaje: "Faltan parámetros: se requiere 'id_usuario' e 'id_juego'."
    });
  }
  
  try {
    const datos_usuario_juego = await getUsuarioJuego(id_usuario, id_juego);

    if(datos_usuario_juego){
      return res.status(200).json({
        success: true,
        data: datos_usuario_juego
      });
    } else {
      return res.status(200).json({
        success: true,
        data: null
      });
    }
    
  } catch (error) {
    console.error("Error al obtener juegos del usuario:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }

};


// Controlador que ya no se usa, pero se deja comentado:
// export const comprobarGameTag = async (req, res) => {
//   const { gameTag } = req.body;

//   if (!gameTag) {
//     return res.status(400).json({
//       success: false,
//       mensaje: "Falta el parámetro gameTag."
//     });
//   }

//   try {
//     const existe = await existeGameTag(gameTag);
//     return res.status(200).json({
//       success: true,
//       existe
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       mensaje: "Error al comprobar gameTag.",
//       error: error.message
//     });
//   }
// };
