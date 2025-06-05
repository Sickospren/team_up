import express from "express"
import {crearGuia} from "../controllers/guias_controller.mjs"

const router = express.Router()

router.post("/new", crearGuia)


export default router