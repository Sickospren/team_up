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

export const getJuegoById = async (id_juego) => {
    const [registros] = await db.query("SELECT * FROM juegos WHERE id_juego = ?", [id_juego]);

    if (registros.length === 0) return null;

    const juego = registros[0];
    return new Juego(
        juego.id_juego,
        juego.nombre,
        juego.descripcion,
        juego.banner,
        juego.foto_juego,
        juego.dispositivos,
        juego.categoria,
        JSON.parse(juego.rangos || '[]')
    );
};

