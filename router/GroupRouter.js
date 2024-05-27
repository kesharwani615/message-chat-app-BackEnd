import {Router} from "express";
// import GroupMemberSchema from "../models/GroupModel.js";
import ProtectMiddleware from "../middleware/ProtectMiddleware.js";
// import GroupConversationSchema from "../models/GroupConversation.js"
// import groupMessageSchema from "../models/GroupMessage.js"
import {createUserGroup,sendMessage,getMessage,getAllUser} from "../controllers/groupHandler.js"

const router=Router();

router.post('/create',ProtectMiddleware,createUserGroup)

router.post("/sendMessage/:id",ProtectMiddleware,sendMessage)

router.get("/getMessage/:id",ProtectMiddleware,getMessage)

router.get('/allGroups',ProtectMiddleware,getAllUser)


export default router;