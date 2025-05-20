import express from "express"
import {getAllUsuarios, getDatosUsuario} from "../controllers/usuario_controller.mjs"

const router = express.Router()

router.get("/", getAllUsuarios)
router.get("/datosUsuario", getDatosUsuario)

export default router