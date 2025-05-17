import express from "express"
import {getAllUsuarios, getUsuarioId,} from "../controllers/usuario_controller.mjs"

const router = express.Router()

router.get("/", getAllUsuarios)
router.get("/obtenerId", getUsuarioId)

export default router