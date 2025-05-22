import express from "express"
import {getAllUsuarios, getUsuarioId, getDatosUsuario} from "../controllers/usuario_controller.mjs"

const router = express.Router()

router.get("/", getAllUsuarios)
router.get("/obtenerId", getUsuarioId)
router.get("/datosUsuario", getDatosUsuario)

export default router