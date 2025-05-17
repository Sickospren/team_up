import db from "../config/db.mjs";

export class Categoria {
    constructor(id_categoria, nombre) {
        this.id_categoria = id_categoria;
        this.nombre = nombre;
    }
}

export const getAllCategorias = async () => {
    try {
        const [registros] = await db.query("SELECT * FROM categorias");

        return registros.map(categoria => new Categoria(
            categoria.id_categoria,
            categoria.nombre,
        ));
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
        throw error;
    }
};

export const insertarCategoria = async (nuevaCategoria) => {
    try {
        const consulta = `
            INSERT INTO categorias 
            (nombre)
            VALUES (?)
        `;
        
        const [resultado] = await db.execute(consulta, [nuevaCategoria.nombre]);

        const categoriaInsertada = new Categoria(resultado.insertId, nuevaCategoria.nombre);

        return categoriaInsertada;

    } catch (error) {
        console.error('Error al insertar la categoría:', error);
        throw error;
    }
};