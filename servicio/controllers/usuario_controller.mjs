import { Usuario,getAll,getUsuario} from "../models/usuario.mjs";

export const getAllUsuarios = async(req,res) => {
    
    try{        
        const usuarios = await getAll();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({mensaje:"error al conseguir todos los Usuarios",error});
    }

}

export const getDatosUsuario = async(req,res) => {
    const email = req.query.email;

    try{        
        const usuario = await getUsuario(email);
        res.json(usuario);
    }catch(error){
        res.status(500).json({mensaje:"error al conseguir los datos del usuario",error});
    }

}

