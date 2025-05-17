import { Usuario, getAll, getId } from "../models/usuario.mjs";

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
        // Obtener el nombre de usuario de los parámetros de consulta (query params)
        const { nombre_usuario } = req.query;
        
        // Verificar que se proporcionó un nombre de usuario
        if (!nombre_usuario) {
            return res.status(400).json({ mensaje: "Se requiere el nombre de usuario" });
        }
        
        // Llamar a la función del modelo
        const resultado = await getId(nombre_usuario);
        
        // Verificar si se encontró el usuario
        if (resultado === null) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Devolver el ID del usuario
        res.json(resultado);
    } catch (error) {
        console.error("Error al obtener ID del usuario:", error);
        res.status(500).json({ mensaje: "Error al conseguir el ID del usuario", error: error.message });
    }
}
