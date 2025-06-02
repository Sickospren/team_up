import express from "express";
import { getUserChats, getChatMessages, createNewChat, abandonarChat, unirseChat, getChatUsuarios } from "../controllers/chat_controller.mjs";

const router = express.Router();

// Obtener todos los chats de un usuario
router.get("/usuario/:id_usuario", getUserChats);

// Obtener todos los mensajes de un chat
router.get("/:id_chat/mensajes", getChatMessages);
router.get("/:id_chat/usuarios", getChatUsuarios);

router.post('/crearChat', createNewChat);
router.post('/unirseChat', unirseChat);
router.delete('/abandonarChat', abandonarChat);

export default router;