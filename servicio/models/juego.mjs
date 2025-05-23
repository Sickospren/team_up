import db from "../config/db.mjs";

export class Juego {
    constructor(id_juego, nombre, descripcion, banner, foto_juego, dispositivos, categoria, rangos) {
        this.id_juego = id_juego;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.banner = banner;
        this.foto_juego = foto_juego;
        this.dispositivos = dispositivos;
        this.categoria = categoria;
        this.rangos = rangos;
    }
}

export const getAllJuegos = async () => {
    try {
        const [registros] = await db.query(`
            SELECT j.*, c.nombre AS nombre_categoria
            FROM juegos j
            JOIN categorias c ON j.id_categoria = c.id_categoria
            WHERE j.borrado = 0
        `);

        return registros.map(juego => new Juego(
            juego.id_juego,
            juego.nombre,
            juego.descripcion,
            juego.banner,
            juego.foto_juego,
            juego.dispositivos,
            juego.nombre_categoria,
            JSON.parse(juego.rangos || '[]')
        ));
    } catch (error) {
        console.error('Error al obtener todos los juegos:', error);
        throw error;
    }
};



export const getJuegoById = async (nombre_juego) => {
    const [registros] = await db.query("SELECT * FROM juegos WHERE nombre = ? AND borrado = 0", [nombre_juego]);

    if (registros.length === 0) return null;

    const juego = registros[0];
    const [registro] = await db.query("SELECT nombre FROM categorias WHERE id_categoria = ?", [juego.id_categoria]);
    const juegoCategoria = registro[0];
    return new Juego(
        juego.id_juego,
        juego.nombre,
        juego.descripcion,
        juego.banner,
        juego.foto_juego,
        juego.dispositivos,
        juegoCategoria.nombre,
        JSON.parse(juego.rangos || '[]')
    );
};

export const insertarJuego = async (juegoData) => {
    const {
        nombre,
        descripcion,
        banner,
        foto_juego,
        dispositivos,
        categoria,
        rangos
    } = juegoData;

    try {
        const consulta = `
            INSERT INTO juegos 
            (nombre, descripcion, banner, foto_juego, dispositivos, id_categoria, rangos)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        const [resultado] = await db.execute(consulta, [
            nombre,
            descripcion,
            banner,
            foto_juego,
            dispositivos,
            categoria,
            JSON.stringify(rangos)
        ]);

        return { insertado: true, id: resultado.insertId };

    } catch (error) {
        console.error('Error al insertar el juego:', error);
        throw error;
    }
};

export const actualizarJuego = async (juegoActualizado) => {
    const {
        nombre,
        descripcion,
        banner,
        foto_juego,
        dispositivos,
        categoria,
        rangos
    } = juegoActualizado;

    try {
        const consulta = `
            UPDATE juegos 
            SET nombre = ?, descripcion = ?, banner = ?, foto_juego = ?, dispositivos = ?, id_categoria = ?,  rangos = ?
            WHERE nombre = ?
        `;

        const [resultado] = await db.execute(consulta, [
            nombre,
            descripcion,
            banner,
            foto_juego,
            dispositivos,
            categoria,
            JSON.stringify(rangos),
            nombre
        ]);

        return resultado;

    } catch (error) {
        console.error('Error al actualizar el juego:', error);
        throw error;
    }
};

export const eliminarJuego = async (juegoBorrado) => {
    const {nombre} = juegoBorrado;
    try {
        const consulta = `
            UPDATE juegos 
            SET borrado = 1
            WHERE nombre = ?
        `;
        const [resultado] = await db.execute(consulta, [nombre]);
        return resultado;
    } catch (error) {
        console.error('Error al borrar el juego:', error);
        throw error;
    }
};
