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

    try {
        // Comprobamos el email de usuario
        const [rows] = await pool.query(`SELECT * FROM usuario WHERE email = ?`, [email]);

        if (rows.length > 0) {
            const usuarioExistente = rows[0];
            if (usuarioExistente.proveedor !== provider) {
                // Si el correo esta registrado con ese usuario devolvemos un error
                return done(null, false, {message: `cuenta ya registrada con otro proveedor`});
            } else {
                // Si el proveedor es el mismo actualizamos los datos
                await pool.query(`
                    UPDATE usuario
                    SET nombre_usuario = ?, avatar = ?
                    WHERE email = ?
                `, [displayName, avatar_url, email]);

                const user = {
                    id: usuarioExistente.id_usuario,
                    username: displayName,
                    avatar: avatar_url,
                    provider,
                    email,
                    date: fechaMySQL,
                    is_admin: usuarioExistente.administrador === 1

                };

                return done(null, user);
            }
        } else {

            // Si el usuario es nuevo lo registramos en la BD
            const [result] = await pool.query(`
                INSERT INTO usuario (id_oauth, nombre_usuario, avatar, proveedor, email, fecha_registro)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [id, displayName, avatar_url, provider, email, fechaMySQL]);

            const [nuevo] = await pool.query(`SELECT * FROM usuario WHERE id_usuario = ?`, [result.insertId]);
            const nuevoUsuario = nuevo[0];

            const user = {
                id: nuevoUsuario.id_usuario,
                id_oauth: id,
                username: displayName,
                avatar: avatar_url,
                provider,
                email,
                date: fechaMySQL,
                is_admin: nuevoUsuario.administrador === 1
            };

            return done(null, user);
        }

    } catch (err) {
        console.error('Error guardando en la base de datos (Google):', err);
        return done(err, null);
    }
}));
