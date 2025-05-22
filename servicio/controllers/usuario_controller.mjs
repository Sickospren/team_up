import { Usuario, getAll, getId, getUsuario } from "../models/usuario.mjs";

export const getAllUsuarios = async (req, res) => {

    try {
        const usuarios = await getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "error al conseguir todos los Usuarios", error });
    }

}

export const getUsuarioId = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ mensaje: "Se requiere el email del usuario" });
        }

        const resultado = await getId(email);

        if (resultado === null) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(resultado);
    } catch (error) {
        console.error("Error al obtener ID del usuario:", error);
        res.status(500).json({ mensaje: "Error al conseguir el ID del usuario", error: error.message });
    }
}

export const getDatosUsuario = async(req,res) => {
    const email = req.query.email;

    try{        
        const usuario = await getUsuario(email);
        res.json(usuario);
    }catch(error){
        res.status(500).json({mensaje:"error al conseguir los datos del usuario",error});
    }

}

