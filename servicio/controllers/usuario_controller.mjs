import { Usuario,getAll } from "../models/usuario.mjs";

export const getAllUsuarios = async(req,res) => {
    
    try{        
        const usuarios = await getAll();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({mensaje:"error al conseguir todos los Usuarios",error});
    }

}
