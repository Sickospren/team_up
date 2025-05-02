import express from "express"
import {getJuegoID} from "../controllers/juego_controller.mjs"

const router = express.Router()

router.get("/:id_juego", getJuegoID)

export default router