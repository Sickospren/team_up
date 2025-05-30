import express from "express"
import {newSolicitud,revisarRecibidas,revisarEnviadas,getIsPendiente, rechazar, aceptar} from "../controllers/solicitudes_amistad_controller.mjs"

const router = express.Router()


router.get("/pendiente/:id1/:id2", getIsPendiente) //Funcionan con el email del usuario en el body
router.post("/enviadas", revisarEnviadas) // id_remitente en el body
router.post("/recibidas", revisarRecibidas) // id_destinatario en el body
router.post("/nueva", newSolicitud) // id_remitente y id_destinatario en el body
router.put("/rechazar", rechazar) // Id_peticion en el body
router.put("/aceptar", aceptar) // Id_peticion en el body

export default router