import express from "express"
import cors from 'cors';
import index_routes from "./routes/index.mjs"

const app = express()

// Middlewares globales
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Rutas
// establece un prefijo común, todas las rutas deben comenzar por /api
app.use("/", index_routes) 

export default app