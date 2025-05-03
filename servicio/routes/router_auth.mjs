import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import '../strategies/discord.mjs';
import '../strategies/google.mjs';


const router = express.Router()

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

router.get('/discord', passport.authenticate('discord'));
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/auth/dashboard');
    }
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/auth/dashboard');
    }
);

router.get('/dashboard', checkAuth, (req, res) => {
    const { username, id, avatar, provider, email } = req.user;
  
    res.send(`
        <h1>Hola, ${username}!</h1>
        <img src="${avatar}" alt="Avatar de ${username}" width="128" height="128" style="border-radius: 50%;">
        <p><strong>Proveedor:</strong> ${provider}</p>
        <p><strong>Email:</strong> ${email || 'No disponible'}</p>
        <p><strong>Id:</strong> ${id}</p>
        <p><strong>Avatar-String:</strong> ${avatar}</p>
        <p><a href="/auth/logout">Cerrar sesión</a></p>
      `);
  });


export default router