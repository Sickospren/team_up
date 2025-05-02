import { Juego, getJuegoById, insertarJuego} from "../models/juego.mjs";

export const getJuegoID = async(req,res) => {
    try{        
        const nombre_juego = req.params.nombre_juego;
        const juego = await getJuegoById(nombre_juego);
        res.json(juego);
    }catch(error){
        res.status(500).json({mensaje:"error al conseguir los datos del juego",error});
    }

}

export const annadirJuego = async (req, res) => {
    const { nombre, descripcion, banner, foto_juego, dispositivos, categoria, rangos } = req.body;

    if (!nombre || !descripcion || !banner || !foto_juego || !dispositivos || !categoria || !rangos) {
        return res.status(400).json({ mensaje: "Faltan datos requeridos en la solicitud" });
    }

    try {
        const nuevoJuego = new Juego(
            null,
            nombre,
            descripcion,
            banner,
            foto_juego,
            dispositivos,
            categoria,
            rangos
        );

        const resultado = await insertarJuego(nuevoJuego);
        if (resultado) {
            res.status(201).json({ mensaje: "Juego añadido correctamente", juego: nuevoJuego });
        } else {
            res.status(500).json({ mensaje: "Error al insertar el juego" });
        }

    } catch (error) {
        res.status(500).json({ mensaje: "Error al añadir el juego", error });
    }
};