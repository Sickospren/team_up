import express from "express"
import {crearGuia,selectGuias,selectGuiasPorCampeon,selectGuiasPorUsuario,eliminarGuia,obtenerGuiaPorId,listarCampeones} from "../controllers/guias_controller.mjs"

const router = express.Router()

router.get("/champ/:campeon", selectGuiasPorCampeon)
router.get("/user/:id_usuario", selectGuiasPorUsuario)
router.get('/campeones', listarCampeones)
router.post("/new", crearGuia)
router.get("/:id", obtenerGuiaPorId)
router.delete("/delete", eliminarGuia)
router.get("/", selectGuias)

export default router