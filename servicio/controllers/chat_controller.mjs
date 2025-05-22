import { getChatsByUserId, getMessagesByChatId, userBelongsToChat } from '../models/chat.mjs';

// Obtener todos los chats de un usuario
export const getUserChats = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        
        if (!id_usuario) {
            return res.status(400).json({ mensaje: 'Se requiere el ID del usuario' });
        }
        
        const chats = await getChatsByUserId(id_usuario);
        res.json(chats);
    } catch (error) {
        console.error('Error al obtener chats del usuario:', error);
        res.status(500).json({ 
            mensaje: 'Error al obtener los chats del usuario', 
            error: error.message 
        });
    }
};

// Obtener todos los mensajes de un chat
export const getChatMessages = async (req, res) => {
    try {
        const { id_chat } = req.params;
        
        if (!id_chat) {
            return res.status(400).json({ mensaje: 'Se requiere el ID del chat' });
        }
        
        const mensajes = await getMessagesByChatId(id_chat);
        res.json(mensajes);
    } catch (error) {
        console.error('Error al obtener mensajes del chat:', error);
        res.status(500).json({ 
            mensaje: 'Error al obtener los mensajes del chat', 
            error: error.message 
        });
    }
};