import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import '../strategies/discord.mjs';
import '../strategies/google.mjs';

dotenv.config();

const router = express.Router()

router.get('/discord', passport.authenticate('discord'));
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: `${process.env.CLIENTE_IP}/LoginError`, 
        session: false
    }),
    (req, res) => {
        const token = jwt.sign({
            id_usuario: req.user.id,
            id_oauth : req.user.id_oauth,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            provider: req.user.provider,
            is_admin: req.user.is_admin
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.redirect(`${process.env.CLIENTE_IP}/?token=${token}`);
    }
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.CLIENTE_IP}/LoginError`,
        session: false
    }),
    (req, res) => {
        const token = jwt.sign({
            id_usuario: req.user.id,
            id_oauth: req.user.id_oauth, 
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
            provider: req.user.provider,
            is_admin: req.user.is_admin
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.redirect(`${process.env.CLIENTE_IP}/?token=${token}`);
    }
);


export default router