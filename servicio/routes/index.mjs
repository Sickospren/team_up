import express from "express"
import router_usuario from "./router_usuario.mjs"
import router_juego from "./router_juego.mjs"

const router = express.Router()

router.use("/usuario", router_usuario)
router.use("/juegos", router_juego)

export default router





