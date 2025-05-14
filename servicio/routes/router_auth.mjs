import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import '../strategies/discord.mjs';
import '../strategies/google.mjs';


const router = express.Router()

router.get('/discord', passport.authenticate('discord'));
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: 'http://localhost:5173/',
        session:false
    }),
    (req, res) => {

        const token = jwt.sign({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            provider: req.user.provider
        },process.env.JWT_SECRET,{expiresIn:'1d'} )
        // mandamos el token en la url
        res.redirect(`http://localhost:5173/?token=${token}`);
    }
);

router.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'http://localhost:5173/',
      session: false
    }),
    (req, res) => {
      const token = jwt.sign({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider
      }, process.env.JWT_SECRET, { expiresIn: '1d' });
      // redirect al front
      res.redirect(`http://localhost:5173/?token=${token}`);
    }
  );

// Ruta de debug para probar el token desde el server
// router.get('/dashboard', (req, res) => {
//     const { token } = req.query; // Sacamos el token de la url

//     if (!token) {
//         return res.status(400).send('<h1>Token no proporcionado</h1>');
//     }

//     try {
        
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const { username, id, avatar, provider, email } = decoded;

//         res.send(`
//             <h1>Hola, ${username}!</h1>
//             <img src="${avatar}" alt="Avatar de ${username}" width="128" height="128" style="border-radius: 50%;">
//             <p><strong>Proveedor:</strong> ${provider}</p>
//             <p><strong>Email:</strong> ${email || 'No disponible'}</p>
//             <p><strong>Id:</strong> ${id}</p>
//             <p><strong>Avatar-String:</strong> ${avatar}</p>
//             <p><strong>Token:</strong> ${token}</p> <!-- Mostramos el token -->
//             <p><a href="/auth/logout">Cerrar sesión</a></p>
//         `);
//     } catch (err) {
//         // Si el token es inválido o expirado
//         return res.status(403).send('<h1>Token inválido</h1>');
//     }
// });

// Debug para salir 
router.get('/logout', (req, res) => {
        
        res.redirect('/');
    });



/* Código para decodificar el token desde react
import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token'); // o donde lo tengas guardado
const decoded = jwt_decode(token);

console.log(decoded); // { id, username, email, avatar, provider }
*/


export default router