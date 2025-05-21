import express from "express"
import {getAmistades, getSonAmigos, deleteAmistad} from "../controllers/amistades_controller.mjs"

const router = express.Router()

router.get('/:email', getAmistades); //Devuelve la lista de amistades de un usuario, pasando el email como parametro
router.get('/sonAmigos/:id1/:id2',getSonAmigos )// Retorna true si 2 usuarios son amigos
router.delete(`/eliminar`, deleteAmistad); // Elimina la amistad entre 2 amigos



export default router