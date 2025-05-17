import { Categoria, getAllCategorias ,insertarCategoria} from "../models/categoria.mjs";

export const getAllCategoria = async(req,res) => { 
    try{        
        const categorias = await getAllCategorias();
        res.json(categorias);
    }catch(error){
        res.status(500).json({mensaje:"error al conseguir todas las categorias",error});
    }
}

export const annadirCategoria = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ mensaje: "Faltan datos requeridos en la solicitud" });
    }

    try {
        const nuevaCategoria = new Categoria(null, nombre);

        const categoriaInsertada = await insertarCategoria(nuevaCategoria);
        if (categoriaInsertada) {
            res.status(201).json({
                mensaje: "Categoria añadida correctamente",
                categoria: categoriaInsertada
            });
        } else {
            res.status(500).json({ mensaje: "Error al insertar la categoria" });
        }

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al añadir la categoria",
            error
        });
    }
};

