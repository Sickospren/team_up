import express from "express";
import {getChat, getUserChats, getChatMessages, createNewChat, abandonarChat, unirseChat, getChatUsuarios } from "../controllers/chat_controller.mjs";

const router = express.Router();

router.get("/:id_chat", getChat);
router.get("/usuario/:id_usuario", getUserChats); // Devuelve los chats donde está un usuario
router.get("/:id_chat/mensajes", getChatMessages); // Devuelve los mensajes de un chat 
router.get("/:id_chat/usuarios", getChatUsuarios); // Devuelve los usuarios de un chat
router.post('/crearChat', createNewChat);
router.post('/unirseChat', unirseChat);
router.delete('/abandonarChat', abandonarChat);

export default router;