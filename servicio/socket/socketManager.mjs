import db from "../config/db.mjs";

export function configurarSocketIO(io) {
  io.on('connection', async (socket) => {
    console.log('Un usuario se ha conectado');

    // Unirse a una sala (chat)
    socket.on('join room', async ({ idChat, idUsuario, username }) => {
      // Abandonar todas las salas anteriores
      socket.leaveAll ? socket.leaveAll() : Object.keys(socket.rooms).forEach(r => {
        if (r !== socket.id) socket.leave(r);
      });
      
      socket.join(`chat_${idChat}`);
      socket.data.idChat = idChat;
      socket.data.idUsuario = idUsuario;
      socket.data.username = username;
      
      console.log(`${username} (ID: ${idUsuario}) se unió al chat ${idChat}`);

      try {
        // Verificar si el usuario ya está en el chat
        const [existeUsuarioEnChat] = await db.query(
          'SELECT * FROM chat_usuario WHERE id_chat = ? AND id_usuario = ?',
          [idChat, idUsuario]
        );

        // Si no está en el chat, lo añadimos
        if (existeUsuarioEnChat.length === 0) {
          await db.query(
            'INSERT INTO chat_usuario (id_chat, id_usuario, fecha_union) VALUES (?, ?, NOW())',
            [idChat, idUsuario]
          );
        }

        // Cargar historial de mensajes
        const [messages] = await db.query(
          `SELECT m.id_mensaje, m.mensaje as content, m.id_chat, m.id_usuario, u.nombre_usuario as username, m.fecha_mensaje 
           FROM mensajes m 
           JOIN usuario u ON m.id_usuario = u.id_usuario 
           WHERE m.id_chat = ? 
           ORDER BY m.fecha_mensaje ASC`,
          [idChat]
        );
        
        socket.emit('load messages', messages);
      } catch (e) {
        console.error('Error al procesar unión a sala:', e);
      }
    });

    // Chat privado entre dos usuarios
    socket.on('private chat', async ({ otherUserId, userId, username }) => {
      if (!otherUserId || !userId) return;

      try {
        // Verificar si ya existe un chat privado entre estos usuarios
        const [existingChat] = await db.query(
          `SELECT c.id_chat 
           FROM chat c
           JOIN chat_usuario cu1 ON c.id_chat = cu1.id_chat
           JOIN chat_usuario cu2 ON c.id_chat = cu2.id_chat
           WHERE cu1.id_usuario = ? AND cu2.id_usuario = ? AND 
                 (SELECT COUNT(*) FROM chat_usuario WHERE id_chat = c.id_chat) = 2`,
          [userId, otherUserId]
        );

        let chatId;
        
        if (existingChat.length > 0) {
          // Usar el chat existente
          chatId = existingChat[0].id_chat;
        } else {
          // Crear un nuevo chat privado
          let nombre_chat = [username, otherUser].sort().join('_');
          const [result] = await db.query(
            'INSERT INTO chat (nombre, descripcion) VALUES (?, ?)',
            [`Chat privado ${nombre_chat}`, 'Chat privado entre dos usuarios']
          );
          
          chatId = result.insertId;
          
          // Añadir ambos usuarios al chat
          await db.query(
            'INSERT INTO chat_usuario (id_chat, id_usuario, fecha_union) VALUES (?, ?, NOW()), (?, ?, NOW())',
            [chatId, userId, chatId, otherUserId]
          );
        }

        // Unirse a la sala del chat
        socket.leaveAll ? socket.leaveAll() : Object.keys(socket.rooms).forEach(r => {
          if (r !== socket.id) socket.leave(r);
        });
        
        socket.join(`chat_${chatId}`);
        socket.data.idChat = chatId;
        socket.data.idUsuario = userId;
        socket.data.username = username;
        
        console.log(`${username} (ID: ${userId}) inició/se unió a un chat privado con usuario ID: ${otherUserId}`);

        // Cargar historial de mensajes
        const [messages] = await db.query(
          `SELECT m.id_mensaje, m.mensaje as content, u.nombre_usuario as username, m.fecha_mensaje 
           FROM mensajes m 
           JOIN usuarios u ON m.id_usuario = u.id_usuario 
           WHERE m.id_chat = ? 
           ORDER BY m.fecha_mensaje ASC`,
          [chatId]
        );
        
        socket.emit('load messages', messages);
      } catch (e) {
        console.error('Error al procesar chat privado:', e);
      }
    });

    // Enviar mensaje
    socket.on('chat message', async (msg) => {
      if (!socket.data.idChat || !socket.data.idUsuario) return;

      try {
        // Guardar mensaje en la base de datos
        await db.query(
          'INSERT INTO mensajes (id_chat, id_usuario, mensaje, fecha_mensaje) VALUES (?, ?, ?, NOW())',
          [socket.data.idChat, socket.data.idUsuario, msg]
        );
        
        // Obtener el nombre de usuario para enviarlo con el mensaje
        const [userData] = await db.query(
          'SELECT nombre_usuario FROM usuario WHERE id_usuario = ?',
          [socket.data.idUsuario]
        );
        
        const username = userData[0]?.nombre_usuario || 'Usuario desconocido';
        
        // Emitir mensaje a todos los usuarios en la sala
        io.to(`chat_${socket.data.idChat}`).emit('chat message', { 
          username: username, 
          content: msg,
          id_usuario: socket.data.idUsuario,
          fecha_mensaje: new Date()
        });
      } catch (e) {
        console.error('Error al enviar mensaje:', e);
      }
    });

    socket.on('disconnect', () => {
      console.log(`${socket.data?.username || 'Usuario desconocido'} se ha desconectado`);
    });
  });
}