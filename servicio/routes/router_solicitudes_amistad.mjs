import express from "express"
import {newSolicitud,revisarRecibidas,revisarEnviadas,getSolicitudesPenditentesEmail,getSolicitudesEnviadasEmail, rechazar, aceptar} from "../controllers/solicitudes_amistad_controller.mjs"

const router = express.Router()


router.get("/recibidas", revisarRecibidas) // id_destinatario en el body
router.get("/enviadas", revisarEnviadas) // id_remitente en el body
router.get("/pendientes", getSolicitudesPenditentesEmail) //Funcionan con el email del usuario en el body
router.get("/enviadas",getSolicitudesEnviadasEmail) //Funcionan con el email del usuario en el body
router.post("/nueva", newSolicitud) // id_remitente y id_destinatario en el body
router.put("/rechazar", rechazar) // Id_peticion en el body
router.put("/aceptar", aceptar) // Id_peticion en el body

export default router