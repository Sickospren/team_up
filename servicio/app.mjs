import express from "express";
import passport from "passport";
import cors from "cors";
import index_routes from "./routes/index.mjs";
import { configDotenv } from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { configurarSocketIO } from "./socket/socketManager.mjs";

import dotenv from 'dotenv';

dotenv.config();

const app = express()

// Crear servidor HTTP usando la app Express
const server = createServer(app);

// Configurar Socket.io con el servidor HTTP
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENTE_IP,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Configurar los eventos de Socket.io
configurarSocketIO(io);

// Middlewares globales
app.use(cors({
    origin: process.env.CLIENTE_IP,
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());

app.use("/", index_routes)

// Exportamos tanto app como server para poder usarlos en server.mjs
export { app, server };
export default app
