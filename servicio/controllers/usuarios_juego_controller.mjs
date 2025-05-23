import {getUsuariosPorJuego,guardarUsuarioJuego,deleteUsuarioJuego,existeGameTag} from "../models/usuarios_juego.mjs";

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