import db from '../config/db.mjs';

// Obtener todos los chats a los que pertenece un usuario
export const getChatsByUserId = async (id_usuario) => {
    try {
        const [chats] = await db.query(`SELECT c.id_chat, c.nombre, c.descripcion
            FROM chat c
            INNER JOIN chat_usuario cu ON c.id_chat = cu.id_chat
            WHERE cu.id_usuario = ?
            ORDER BY c.id_chat DESC`,
            [id_usuario]);

        return chats;
    } catch (error) {
        console.error('Error al obtener chats del usuario:', error);
        throw error;
    }
};

// Obtener todos los mensajes de un chat
export const getMessagesByChatId = async (id_chat) => {
    try {
        const [mensajes] = await db.query(`SELECT m.id_mensaje, m.id_usuario, m.mensaje as content, 
            u.nombre as username, m.fecha_mensaje
            FROM mensajes m
            INNER JOIN usuario u ON m.id_usuario = u.id_usuario
            WHERE m.id_chat = ?
            ORDER BY m.fecha_mensaje ASC`,
            [id_chat]);

        return mensajes;
    } catch (error) {
        console.error('Error al obtener mensajes del chat:', error);
        throw error;
    }
};

// Verificar si un usuario pertenece a un chat
export const userBelongsToChat = async (id_usuario, id_chat) => {
    try {
        const [result] = await db.query(`SELECT * FROM chat_usuario
            WHERE id_usuario = ? AND id_chat = ?`,
            [id_usuario, id_chat]);

        return result.length > 0;
    } catch (error) {
        console.error('Error al verificar pertenencia a chat:', error);
        throw error;
    }
};