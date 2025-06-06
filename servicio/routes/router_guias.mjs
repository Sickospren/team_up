import express from "express"
import {crearGuia,selectGuias,selectGuiasPorCampeon,selectGuiasPorUsuario,eliminarGuia,obtenerGuiaPorId} from "../controllers/guias_controller.mjs"

const router = express.Router()

router.post("/new", crearGuia)
router.get("/", selectGuias)
router.get("/champ/:campeon", selectGuiasPorCampeon)
router.get("/user/:id_usuario", selectGuiasPorUsuario)
router.get("/:id", obtenerGuiaPorId)
router.delete("/delete/:id", eliminarGuia)


export default router