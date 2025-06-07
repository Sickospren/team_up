import db from "../config/db.mjs";

export class Usuario {
    constructor(id_usuario, proveedor, nombre_usuario, avatar, email, fecha_registro, nombre_usuario_app) {
        this.id_usuario = id_usuario;
        this.proveedor = proveedor;
        this.nombre_usuario = nombre_usuario;
        this.avatar = avatar;
        this.email = email;
        this.fecha_registro = fecha_registro;
        this.nombre_usuario_app = nombre_usuario_app;
    }
}

export const getAll = async () => {
    const [usuarios] = await db.query("SELECT * FROM usuario");
    for (const usuario of usuarios) {
        const [juegos] = await db.query(
        `SELECT id_juego FROM usuarios_juego WHERE id_usuario = ?`, 
        [usuario.id_usuario]
        );
        usuario.juegos = juegos.map(j => j.id_juego)
    }
    return usuarios;
}

export const getId = async (email) => {
    try {
        const [rows] = await db.query(
            "SELECT id_usuario FROM usuario WHERE email = ?", 
            [email]
        );
        
        if (rows.length === 0) {
            return null;
        }
        
        return rows[0];
    } catch (error) {
        console.error("Error en la consulta de ID de usuario:", error);
        throw error;
    }
}

export const getUsuario = async (emailUsuario) => {
  const [registros] = await db.query("SELECT * FROM usuario WHERE email = ?", [emailUsuario]);

  if (registros.length === 0) return null;

  const usuario = registros[0];
  return new Usuario(
    usuario.id_usuario,
    usuario.proveedor,
    usuario.nombre_usuario,
    usuario.avatar,
    usuario.email,
    usuario.fecha_registro,
    usuario.nombre_usuario_app,
  );
};

export const cambiarNombreUser = async (usuarioCambiado) => {
    const {id_usuario, nombre_usuario_app} = usuarioCambiado;
    try {
        const consulta = `
            UPDATE usuario 
            SET nombre_usuario_app = ?
            WHERE id_usuario = ?
        `;
        const [resultado] = await db.execute(consulta, [nombre_usuario_app, id_usuario]);
        return resultado;
    } catch (error) {
        console.error('Error al cambiar el nombre del usuario:', error);
        throw error;
    }
};
