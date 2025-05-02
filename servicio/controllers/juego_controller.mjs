import { Juego, getJuegoById} from "../models/juego.mjs";

export const getJuegoID = async(req,res) => {
    
    try{        
        const id_juego = req.params.id_juego;
        const juego = await getJuegoById(id_juego);
        res.json(juego);
    }catch(error){
        res.status(500).json({mensaje:"error al conseguir los datos del juego",error});
    }

}
