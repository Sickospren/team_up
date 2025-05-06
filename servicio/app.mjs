import express from "express";
import passport from "passport";
import cors from "cors";
import index_routes from "./routes/index.mjs";
import { configDotenv } from "dotenv";
const app = express()

// Middlewares globales
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());

app.use("/", index_routes)

export default app
