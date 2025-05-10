import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import pool from '../config/db.mjs';

dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: process.env.CALLBACK_URL_GOOGLE,
}, async (accessToken, refreshToken, profile, done) => {

    const { id, displayName, photos, emails } = profile;

    const avatar_url = photos?.[0]?.value || '';
    const email = emails?.[0]?.value || '';
    const provider = 'google';

    const hoy = new Date();

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMySQL = `${anio}-${mes}-${dia}`;

    const user = {
        id,
        username: displayName,
        avatar: photos?.[0]?.value,
        provider: provider,
        email: email,
        date: fechaMySQL
    };

    try {
        await pool.query(`
            INSERT INTO usuario (id_usuario, nombre_usuario, avatar, proveedor, email, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE nombre_usuario = VALUES(nombre_usuario), avatar = VALUES(avatar), email = VALUES(email)
        `, [id, displayName, avatar_url, provider, email, fechaMySQL]);

        return done(null, user);
    } catch (err) {
        console.error('Error guardando en la base de datos (Google):', err);
        return done(err, null);
    }
}));
