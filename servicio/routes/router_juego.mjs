import express from "express"
import {getAllJuego, getJuegoID, annadirJuego, editarJuego, borrarJuego, getChatsJuego} from "../controllers/juego_controller.mjs"

const router = express.Router()

router.get("/listadoJuegos", getAllJuego)
router.get("/:nombre_juego", getJuegoID)
router.post("/annadirJuego", annadirJuego)
router.put("/editarJuego", editarJuego)
router.put("/borrarJuego", borrarJuego)
router.get("/chatsJuego/:id_juego", getChatsJuego)

export default router