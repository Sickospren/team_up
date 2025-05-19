import express from "express"
import {newSolicitud,revisarSolicitudes,getSolicitudesPenditentesEmail,getSolicitudesEnviadasEmail, rechazar, aceptar} from "../controllers/solicitudes_amistad_controller.mjs"

const router = express.Router()


router.get("/nueva", newSolicitud) // id_remitente y id_destinatario en el body
router.get("/revisar", revisarSolicitudes) // id_usuario en el body
router.get("/pendientes", getSolicitudesPenditentesEmail) //Funcionan con el email del usuario en el body
router.get("/enviadas",getSolicitudesEnviadasEmail) //Funcionan con el email del usuario en el body
router.put("/rechazar", rechazar) // Id peticion en el body
router.put("/aceptar", aceptar) // Id peticion en el body

export default router