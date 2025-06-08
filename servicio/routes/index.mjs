import express from "express"
import router_usuario from "./router_usuario.mjs"
import router_juego from "./router_juego.mjs"
import router_auth from "./router_auth.mjs"
import router_chat from "./router_chat.mjs";
import router_categoria from "./router_categoria.mjs"
import router_usuarios_amistad from "./router_solicitudes_amistad.mjs"
import router_amistades from "./router_amistades.mjs"
import router_usuarios_juego from "./router_usuarios_juego.mjs"
import router_guias from "./router_guias.mjs"

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router()

// Middleware para validar la API key
router.use((req, res, next) => {
    // Excluir rutas que comienzan con /auth
    if (req.path.startsWith("/auth")) return next()

    const apiKey = req.header("x-api-key") || req.query.api_key
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: "API key inválida o faltante" })
    }

    next()
})
  

router.use("/usuario", router_usuario)
router.use("/juegos", router_juego)
router.use("/auth", router_auth)
router.use("/chat", router_chat)
router.use("/categorias", router_categoria)
router.use("/solicitudes", router_usuarios_amistad)
router.use("/amistades", router_amistades)
router.use("/usuarios_juegos", router_usuarios_juego)
router.use("/guias", router_guias)

export default router





