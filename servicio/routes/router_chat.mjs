import express from "express";
import { getUserChats, getChatMessages, createNewChat } from "../controllers/chat_controller.mjs";

const router = express.Router();

// Obtener todos los chats de un usuario
router.get("/usuario/:id_usuario", getUserChats);

// Obtener todos los mensajes de un chat
router.get("/:id_chat/mensajes", getChatMessages);

router.post('/crearChat', createNewChat);

export default router;