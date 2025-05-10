import { Juego, getJuegoById, insertarJuego, actualizarJuego, eliminarJuego} from "../models/juego.mjs";

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

export const editarJuego = async (req, res) => {
    const juego = req.body;

    if (!juego || !juego.nombre || !juego.descripcion || !juego.banner || !juego.foto_juego || 
        !juego.dispositivos || !juego.categoria || !juego.rangos) {
        return res.status(400).json({ mensaje: "Faltan datos para actualizar el juego" });
    }

    try {
        const juegoExistente = await getJuegoById(juego.nombre);
        if (!juegoExistente) {
            return res.status(404).json({ mensaje: "El juego no existe" });
        }

        const juegoActualizado = new Juego(
            null,
            juego.nombre,
            juego.descripcion,
            juego.banner,
            juego.foto_juego,
            juego.dispositivos,
            juego.categoria,
            juego.rangos
        );

        const resultado = await actualizarJuego(juegoActualizado);

        if (resultado.affectedRows > 0) {
            res.json({ mensaje: "Juego actualizado correctamente", juego: juegoActualizado });
        } else {
            res.status(500).json({ mensaje: "No se pudo actualizar el juego" });
        }

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el juego", error });
    }
};


export const borrarJuego = async (req, res) => {
    const juego = req.body;
    console.log("Hola");
    if (!juego || !juego.nombre ) {
        return res.status(400).json({ mensaje: "Faltan datos para borrar el juego" });
    }

    try {
        const juegoExistente = await getJuegoById(juego.nombre);
        if (!juegoExistente) {
            return res.status(404).json({ mensaje: "El juego no existe" });
        }

        const juegoBorrado = new Juego(
            null,
            juego.nombre,
            null,
            null,
            null,
            null,
            null,
            null
        );

        const resultado = await eliminarJuego(juegoBorrado);

        if (resultado.affectedRows > 0) {
            res.json({ mensaje: "Juego borrado correctamente", juego: juegoBorrado });
        } else {
            res.status(500).json({ mensaje: "No se pudo borrar el juego" });
        }

    } catch (error) {
        res.status(500).json({ mensaje: "Error al borrar el juego", error });
    }
};