import { getChatsByUserId, getMessagesByChatId, userBelongsToChat, createChat, abandonChat } from '../models/chat.mjs';

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

// Nuevo controlador para crear un chat
export const createNewChat = async (req, res) => {
    try {
        const { nombre, descripcion, id_juego, id_usuario, comunidad } = req.body;

        // Validaciones
        if (!nombre || !descripcion || !id_usuario) {
            return res.status(400).json({
                error: 'Nombre, descripción e ID de usuario son requeridos'
            });
        }

        if (typeof comunidad !== 'number' || (comunidad !== 0 && comunidad !== 1)) {
            return res.status(400).json({
                error: 'Comunidad debe ser 0 o 1'
            });
        }

        const chatData = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            id_juego: id_juego || null,
            user_admin: id_usuario,
            comunidad: comunidad
        };

        const result = await createChat(chatData);

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error en createNewChat:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            details: error.message
        });
    }
};

export const abandonarChat = async (req, res) => {
    try {
        const { id_usuario, id_chat } = req.body;

        if (!id_usuario || !id_chat) {
            return res.status(400).json({ mensaje: 'Se requiere el ID del usuario y del chat' });
        }

        const result = await abandonChat(id_usuario, id_chat);

        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error al abandonar el chat:', error);
        res.status(500).json({
            mensaje: 'Error al abandonar el chat',
            error: error.message
        });
    }
}
