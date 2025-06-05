import { insertGuia } from "../models/guias.mjs";


export const crearGuia = async (req, res) => {
    try {
        console.log(req.body)
        const { id_usuario, id_juego, campeon_nombre, contenido_guia, privada } = req.body;

        if (!id_usuario || !id_juego || !campeon_nombre || !contenido_guia) {
            return res.status(400).json({ success: false, error: "Faltan datos obligatorios" });
        }

        const nuevaGuia = await insertGuia(id_usuario,id_juego,campeon_nombre,contenido_guia,privada);

        return res.status(201).json({
            success: true,
            mensaje: "Guía creada con éxito",
            id_guia: nuevaGuia.id_guia
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error al crear la guía"
        });
    }
}
