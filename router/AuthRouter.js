import express, {Router} from 'express';
import { signup, login, logout } from '../controllers/AuthHandler.js';
import ProtectMiddleware from '../middleware/ProtectMiddleware.js';

const router = Router();

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',ProtectMiddleware,logout)

export default router;