import express, {Router} from 'express';
import { signup, login, logout } from '../controllers/AuthHandler.js';

const router = Router();

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

export default router;