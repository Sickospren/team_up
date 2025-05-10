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

    const avatar_url = avatar !== null ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : `https://archive.org/download/discordprofilepictures/discordgrey.png`
    const provider = `discord`;

    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMySQL = `${anio}-${mes}-${dia}`;

    try {

        const user = {
            id,
            username: username,
            avatar: avatar_url,
            provider: provider,
            email: email,
            date: fechaMySQL
        };

        await pool.query(`
          INSERT INTO usuario (id_usuario, nombre_usuario, avatar, proveedor, email, fecha_registro)
          VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE nombre_usuario = VALUES(nombre_usuario), avatar = VALUES(avatar), email = VALUES(email)
        `, [id, username, avatar_url, provider, email, fechaMySQL]);

        return done(null, user);

    } catch (err) {
        console.error('Error guardando en la base de datos(discord):', err);
        return done(err, null);
    }
}));
