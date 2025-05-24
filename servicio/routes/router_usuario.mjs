import express from "express"
import {getAllUsuarios, getUsuarioId, getDatosUsuario, cambiarNombre} from "../controllers/usuario_controller.mjs"

const router = express.Router()

router.get("/", getAllUsuarios)
router.get("/obtenerId", getUsuarioId)
router.get("/datosUsuario", getDatosUsuario)
router.put("/cambiarNombre", cambiarNombre)

export default router