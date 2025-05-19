import express from "express"
import router_usuario from "./router_usuario.mjs"
import router_juego from "./router_juego.mjs"
import router_auth from "./router_auth.mjs"
import router_chat from "./router_chat.mjs";

const router = express.Router()


// Rutas temporales para el login
// Por el momento estoy jugando con el login en el servidor
router.get('/', (req, res) => {
    res.send(`
      <h2>Inicia sesión</h2>
      <a href="/auth/discord">Iniciar sesión con Discord</a><br>
      <a href="/auth/google">Iniciar sesión con Google</a>
    `);
  });

  router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});
  

router.use("/usuario", router_usuario)
router.use("/juegos", router_juego)
router.use("/auth", router_auth)
router.use("/chat", router_chat)

export default router





