import express from "express"
import {getJuegoID, annadirJuego} from "../controllers/juego_controller.mjs"

const router = express.Router()

router.get("/:nombre_juego", getJuegoID)
router.post("/annadirJuego", annadirJuego)

export default router