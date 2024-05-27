import {Router} from 'express';
import ProtectMiddleware from "../middleware/ProtectMiddleware.js";
import { getAllSidebarUser } from "../controllers/UserSidebarController.js";

const router = Router();

router.get('/',ProtectMiddleware,getAllSidebarUser);

export default router;