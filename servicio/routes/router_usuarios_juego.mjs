import express from "express"
import {getAllUsuariosJuego, insertUsuario} from "../controllers/usuarios_juego_controller.mjs"

const router = express.Router()

router.get("/:id_juego", getAllUsuariosJuego)
router.post("/insertar", insertUsuario)

export default router