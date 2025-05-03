import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import index_routes from "./routes/index.mjs";
import { configDotenv } from "dotenv";
const app = express()

// Middlewares globales
app.use(cors({
    origin: `http://localhost:5173`,
    credentials:true
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: process.env.SECRET_APP,
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        httpOnly: true,
        maxAge: 86400000 //1Dia
    }
}))

app.use(passport.initialize());
app.use(passport.session());

// Rutas
// establece un prefijo común, todas las rutas deben comenzar por /api
app.use("/", index_routes) 

export default app