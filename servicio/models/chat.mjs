import db from '../config/db.mjs';
import CryptoJS from 'crypto-js'

// Clave de encriptación desde variables de entorno
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'tu-clave-secreta-muy-segura-aqui';

// Función para desencriptar mensajes
const decryptMessage = (encryptedMessage) => {
    try {
        if (!encryptedMessage) return '';

        const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPTION_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // Si no se puede desencriptar, devolver el mensaje original
        // (útil para mensajes que no están encriptados aún)
        return decrypted || encryptedMessage;
    } catch (error) {
        console.error('Error al desencriptar mensaje:', error);
        return encryptedMessage; // Devolver mensaje original si falla
    }
};

export const getChatById = async (id_chat) => {
    try {
        const [chat] = await db.query(`SELECT c.id_chat, c.nombre, c.descripcion, c.comunidad, c.id_juego, j.nombre AS 'nombre_juego', c.user_admin, u.nombre_usuario
            FROM chat c
            LEFT JOIN juegos j ON c.id_juego = j.id_juego
            LEFT JOIN usuario u ON c.user_admin = u.id_usuario
            WHERE c.id_chat = ?
            ORDER BY c.id_chat DESC`,
            [id_chat]);

        return chat;
    } catch (error) {
        console.error('Error al obtener chats del usuario:', error);
        throw error;
    }
};

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

// Obtener todos los mensajes de un chat (CON DESENCRIPTACIÓN)
export const getMessagesByChatId = async (id_chat) => {
    try {
        const [mensajes] = await db.query(`SELECT m.id_mensaje, m.id_usuario, m.mensaje as encrypted_content, 
            u.nombre_usuario as username, m.fecha_mensaje
            FROM mensajes m
            INNER JOIN usuario u ON m.id_usuario = u.id_usuario
            WHERE m.id_chat = ?
            ORDER BY m.fecha_mensaje ASC`,
            [id_chat]);

        // Desencriptar cada mensaje antes de devolverlo
        const mensajesDesencriptados = mensajes.map(mensaje => ({
            ...mensaje,
            content: decryptMessage(mensaje.encrypted_content),
            // Eliminar el campo encriptado para no enviarlo al cliente
            encrypted_content: undefined
        }));

        return mensajesDesencriptados;
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

// Nueva función para crear un chat
export const createChat = async (chatData) => {
    try {
        const { nombre, descripcion, id_juego, user_admin, comunidad } = chatData;

        const [result] = await db.query(`
            INSERT INTO chat (nombre, descripcion, id_juego, user_admin, comunidad)
            VALUES (?, ?, ?, ?, ?)
        `, [nombre, descripcion, id_juego || null, user_admin, comunidad]);

        // Obtener el chat recién creado
        const [newChat] = await db.query(`
            SELECT c.id_chat, c.nombre, c.descripcion, c.comunidad, c.id_juego, c.user_admin,
                   j.nombre as nombre_juego
            FROM chat c
            LEFT JOIN juegos j ON c.id_juego = j.id_juego
            WHERE c.id_chat = ?
        `, [result.insertId]);

        // Añadir automáticamente al creador como miembro del chat usando joinChat()
        await joinChat(user_admin, result.insertId);

        return {
            id_chat: result.insertId,
            chat: newChat[0],
            message: 'Chat creado exitosamente'
        };
    } catch (error) {
        console.error('Error al crear chat:', error);
        throw error;
    }
};

export const abandonChat = async (id_usuario, id_chat) => {
    try {
        // Eliminar al usuario del chat
        await db.query(`DELETE FROM chat_usuario WHERE id_usuario = ? AND id_chat = ?`, [id_usuario, id_chat]);

        return {
            success: true,
            message: 'Usuario abandonó el chat exitosamente'
        };
    } catch (error) {
        console.error('Error al abandonar el chat:', error);
        throw error;
    }
}

export const joinChat = async (id_usuario, id_chat) => {
    try {
        const fecha_union = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

        await db.query(
            `INSERT INTO chat_usuario (id_usuario, id_chat, fecha_union) VALUES (?, ?, ?)`,
            [id_usuario, id_chat, fecha_union]
        );

        return {
            success: true,
            message: 'Usuario se unió al chat exitosamente'
        };
    } catch (error) {
        console.error('Error al unirse al chat:', error);
        throw error;
    }
};

export const getUsuariosChat = async (id_chat) => {
    try {
        const [rows] = await db.query(
            `SELECT u.id_usuario, u.nombre_usuario, cu.fecha_union
            FROM chat_usuario cu
            JOIN usuario u ON cu.id_usuario = u.id_usuario
            WHERE cu.id_chat = ?`,
            [id_chat]
        );

        return rows;
    } catch (error) {
        console.error('Error al obtener usuarios del chat:', error);
        throw error;
    }
};
