import express from "express"
import {getAllJuego, getJuegoID, annadirJuego, editarJuego, borrarJuego} from "../controllers/juego_controller.mjs"

const router = express.Router()

router.get("/listadoJuegos", getAllJuego)
router.get("/:nombre_juego", getJuegoID)
router.post("/annadirJuego", annadirJuego)
router.put("/editarJuego", editarJuego)
router.put("/borrarJuego", borrarJuego)

export default router