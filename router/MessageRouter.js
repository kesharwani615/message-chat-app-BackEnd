import {Router} from 'express';
import ProtectMiddleware from '../middleware/ProtectMiddleware.js';
import { sendMessage, getMessage } from '../controllers/messageController.js';

const router=Router();

router.post('/sendMessage/:id',ProtectMiddleware,sendMessage)

router.get('/getMessage/:id',ProtectMiddleware,getMessage)


export default router;