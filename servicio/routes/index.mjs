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
router.use("/categorias", router_categoria)
router.use("/solicitudes", router_usuarios_amistad)
router.use("/amistades", router_amistades)
router.use("/usuarios_juegos", router_usuarios_juego)
router.use("/guias", router_guias)

export default router





