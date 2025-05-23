import {getUsuariosPorJuego,guardarUsuarioJuego,deleteUsuarioJuego,existeGameTag, getJuegosPorUsuario} from "../models/usuarios_juego.mjs";

export const getAllUsuariosJuego = async(req,res) => {

    const {id_juego} = req.params

    if (!id_juego){
        return res.status(400).json({
            success: false,
            mensaje: "Faltan parámetros: se requieren 'id_juego'."
        });
    }

    try{        
        const result = await getUsuariosPorJuego(id_juego);
        res.json({
            success: true,
            data: result
        });
    }catch(error){
        res.status(500).json({
            success: false,
            mensaje:"error al conseguir todos los Usuarios",error});
    }
}


// Recibe el id_usuario en los parametros del metodo
export const getJuegosUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res.status(400).json({
      success: false,
      mensaje: "fala el parametro id_usuario"
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

  const { id_juego, id_usuario, gameTag, datosExtraJuego } = req.body;

  if (!id_juego || !id_usuario || !gameTag || !datosExtraJuego) {
    return res.status(400).json({
      success: false,
      mensaje: "Faltan parámetros: se requiere 'id_juego', 'id_usuario', 'gameTag' y 'datosExtraJuego'."
    });
  }

  try {
    const resultado = await guardarUsuarioJuego(id_usuario, id_juego, gameTag, datosExtraJuego);

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

// Borra un usuario de la tabla de usuarios_juego
export const eliminarUsuarioJuego = async (req, res) => {
  const { id_usuario, id_juego } = req.body;

  if (!id_usuario || !id_juego) {
    return res.status(400).json({
      success: false,
      mensaje: "Faltan parámetros: se requiere 'idUsuario' e 'idJuego'."
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

// Metodo que devuelve un true o un false si el metodo existe o no
export const comprobarGameTag = async (req, res) => {
  const { gameTag } = req.params; 

  if (!gameTag) {
    return res.status(400).json({
      success: false,
      data: "Fala el parametro gametag"
    });
  }

  try {
    const existe = await existeGameTag(gameTag);
    return res.status(200).json({
      success: true,
      data: existe
    });

  } catch (error) {
    console.error("Error al comprobar gameTag:", error.message);
    return res.status(500).json({
      success: false,
      data: false,
      error: error
    });
  }
};



