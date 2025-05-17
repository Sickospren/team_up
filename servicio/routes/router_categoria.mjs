import express from "express"
import {getAllCategoria, annadirCategoria} from "../controllers/categoria_controller.mjs"

const router = express.Router()

router.get("/getCategorias", getAllCategoria)
router.post("/annadirCategoria", annadirCategoria)

export default router