import express from "express"
import {getAllUsuarios,} from "../controllers/usuario_controller.mjs"

const router = express.Router()

router.get("/", getAllUsuarios)

export default router