import express from "express"
import {newSolicitud,revisarSolicitudes,getSolicitudesPenditentesEmail,getSolicitudesEnviadasEmail, rechazar} from "../controllers/solicitudes_amistad_controller.mjs"

const router = express.Router()

// id_remitente y id_destinatario en el body
router.get("/nueva", newSolicitud)
// id_usuario en el body
router.get("/revisar", revisarSolicitudes)
//Funcionan con el email del usuario en el body
router.get("/pendientes", getSolicitudesPenditentesEmail)
//Funcionan con el email del usuario en el body
router.get("/enviadas",getSolicitudesEnviadasEmail)
// Id peticion en el body
router.put("/rechazar", rechazar)

export default router