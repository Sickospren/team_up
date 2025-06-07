import express from "express";
import {
  // getAllUsuariosJuego,
  insertUsuario,
  eliminarUsuarioJuego,
  // comprobarGameTag,
  getJuegosUsuario,
  getUsuarioPorJuego
} from "../controllers/usuarios_juego_controller.mjs"; // Asegúrate que el nombre del archivo coincida

const router = express.Router();

// Rutas comentadas porque ya no se usan pero se conservan:
// router.get("/:id_juego", getAllUsuariosJuego); // Recibe la id del juego como param
// router.get("/gameTag/:gameTag", comprobarGameTag); // Recibe el gameTag para buscar como param
router.get("/juego/:id_juego/:id_usuario", getUsuarioPorJuego); //devuelve los datos si existe o null
router.get("/usuario/:id_usuario", getJuegosUsuario); // Recibe la id del usuario como param

/**
 * Recibe id_usuario, id_juego, gameTag y datosExtraJuego (JSON) en el body
 * Si ya existe lo actualiza
 */
router.post("/insertar", insertUsuario); 

router.delete("/eliminar", eliminarUsuarioJuego); // Recibe id_usuario y id_juego en el body

export default router;
