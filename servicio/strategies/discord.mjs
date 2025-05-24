import { Strategy as DiscordStrategy } from 'passport-discord';
import passport from 'passport';
import dotenv from 'dotenv';
import pool from '../config/db.mjs';

dotenv.config();

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    const { id, username, avatar, email } = profile;

    const provider = 'discord';
    const avatar_url = avatar !== null
        ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
        : `https://archive.org/download/discordprofilepictures/discordgrey.png`;

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMySQL = `${anio}-${mes}-${dia}`;

    try {
        // Comprobamos el email de usuario
        const [rows] = await pool.query(`SELECT * FROM usuario WHERE email = ?`, [email]);

        if (rows.length > 0) {
            const usuarioExistente = rows[0];
            // Si el correo esta registrado con ese usuario devolvemos un error
            if (usuarioExistente.proveedor !== provider) {
                return done(null, false, { message: 'cuenta ya registrada con otro proveedor' });
            }

            // Si el proveedor es el mismo actualizamos los datos
            await pool.query(`
                UPDATE usuario
                SET nombre_usuario = ?, avatar = ?, fecha_registro = ?
                WHERE email = ?
            `, [username, avatar_url, fechaMySQL, email]);

            const user = {
                id: usuarioExistente.id_usuario,
                id_oauth: id,
                username,
                avatar: avatar_url,
                provider,
                email,
                date: fechaMySQL,
                is_admin: usuarioExistente.administrador === 1
            };

            return done(null, user);
        } else {
            
            // Si el usuario es nuevo lo registramos en la BD
            const [result] = await pool.query(`
                INSERT INTO usuario (id_oauth, nombre_usuario, avatar, proveedor, email, fecha_registro)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [id, username, avatar_url, provider, email, fechaMySQL]);

            const [nuevo] = await pool.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [result.insertId]);
            const nuevoUsuario = nuevo[0];

            const user = {
                id: nuevoUsuario.id_usuario,
                id_oauth: id,
                username,
                avatar: avatar_url,
                provider,
                email,
                date: fechaMySQL,
                is_admin: nuevoUsuario.administrador === 1
            };

            return done(null, user);
        }

    } catch (err) {
        console.error('Error guardando en la base de datos (Discord):', err);
        return done(err, null);
    }
}));
