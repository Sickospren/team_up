import express from "express"
import {getAllUsuariosJuego, insertUsuario, eliminarUsuarioJuego, comprobarGameTag, getJuegosUsuario} from "../controllers/usuarios_juego_controller.mjs"

const router = express.Router()

router.get("/:id_juego", getAllUsuariosJuego) // Recibe la id del juego como param
router.get("/usuario/:id_usuario",getJuegosUsuario ) // Recibe la id del usuario como param
router.get("/gameTag/:gameTag", comprobarGameTag) // Recibe el gameTag para buscar como param
/**
 * Recibe id_usuario, id_juego, gametag y datosExtraJuego(JSON) en el body
 * Si ya existe lo actualiza
 */
router.post("/insertar", insertUsuario) 
router.delete("/delete", eliminarUsuarioJuego) // Recibe id_usuario y id_juego en el body


export default router