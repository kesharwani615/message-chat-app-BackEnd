import GroupMemberSchema from "../models/GroupModel.js";
import ProtectMiddleware from "../middleware/ProtectMiddleware.js";
import GroupConversationSchema from "../models/GroupConversation.js"
import groupMessageSchema from "../models/GroupMessage.js"
import { provideRoomId,roomSocketMap,io} from "../socket/socket.js";

export const createUserGroup=async (req,res)=>{
    try{
    const gpname = req.body.groupName;
    const groupMember = req.body.collect;

    groupMember.push(req.user)

    // console.log(gpname,groupMember);

    const existGroup=await GroupMemberSchema.findOne({groupName:gpname})

    // console.log("existGroup:",existGroup);
    if(existGroup) return res.status(400).json({message:"Already Exist"});

    const createGroup=new GroupMemberSchema({
        groupName:gpname,
        participants:groupMember,
    })

    // console.log("createGroup:",createGroup._id);

    const createMessageGroup=new GroupConversationSchema({
        groupId:createGroup._id,
    })

    createGroup.GroupConversationId=createMessageGroup._id;
    await createGroup.save();
    await createMessageGroup.save();


    res.status(201).json({message:"group created successfully"})     
    }catch(error){
        console.log("error:",error)
    }
}

export const sendMessage=async (req,res)=>{

    try{
    const grpId=req.params.id;
    const senderId = req.user._id;
    const {getMessage}=req.body;

    // console.log("getMessage:",getMessage);

    const getSendMessageGrp=await GroupMemberSchema.findOne({_id:grpId});

    const getGrpConversation=await GroupConversationSchema.findOne({_id:getSendMessageGrp.GroupConversationId})
     //need to send _id in getGrpConversation

    const PrevMessageConversation=getGrpConversation.messages;

    const sendMessageInGrp=new groupMessageSchema({
        SenderId:req.user._id,
        Message:getMessage,
    })

    await sendMessageInGrp.save();  
    const filterId = {_id:getSendMessageGrp.GroupConversationId};
    const updateData = { $set: { messages: [...PrevMessageConversation,sendMessageInGrp._id] } };
    const options = { upsert: false };
  

    const result = await GroupConversationSchema.updateOne(filterId, updateData, options);

// Custom function to send message to a room using room ID
    const roomId=provideRoomId();

    if(result.error) throw new Error(data.error); 

    res.status(200).json(sendMessageInGrp)
   }catch(error){
    console.log("error:",error)
   }
}

export const getMessage= async (req,res)=>{
    console.log("group called:")
    try{
        const grpId=req.params.id;
        const senderId = req.user._id;

        const getSendMessageGrp=await GroupMemberSchema.findOne({_id:grpId});
        const MessagFetchId=getSendMessageGrp.GroupConversationId;
        const message=await GroupConversationSchema.findOne({_id:MessagFetchId}).populate("messages")

        // console.log("message:",message)

        if(getSendMessageGrp?.error) throw new Error(getSendMessageGrp.error); 

        res.status(200).json({message:message})

    }catch(error){
        res.status(500).json({message:"bad request!"})
    }
}

export const getAllUser = async (req,res)=>{

    const allGroups=await GroupMemberSchema.find({});
    // console.log(allGroups)
    res.status(201).json(allGroups) 
}

