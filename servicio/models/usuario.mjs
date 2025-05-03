import db from "../config/db.mjs";

export class Usuario {
    constructor(id_usuario, proveedor, nombre_usuario, avatar, email, fecha_registro, nombre_usuario_app){
        this.id_usuario = id_usuario;
        this.proveedor = proveedor;
        this.nombre_usuario = nombre_usuario;
        this.avatar = avatar;
        this.email = email;
        this.fecha_registro = fecha_registro;
        this.nombre_usuario_app = nombre_usuario_app;
    }
}

export const getAll = async ()=>{
    const [registros] = await db.query("SELECT * FROM usuario");
    return registros;
}