import db from "../config/db.mjs";

export class Usuario {
    constructor(id_usuario, id_usuario_proveedor, proveedor, nombre_usuario, avatar, email, fecha_registro){
        this.id_usuario = id_usuario;
        this.id_usuario_proveedor = id_usuario_proveedor;
        this.proveedor = proveedor;
        this.nombre_usuario = nombre_usuario;
        this.avatar = avatar;
        this.email = email;
        this.fecha_registro = fecha_registro;
    }
}

export const getAll = async ()=>{
    const [registros] = await db.query("SELECT * FROM usuarios_prueba");
    return registros;
}