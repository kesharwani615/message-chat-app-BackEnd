import mongoose from "mongoose";

const GroupConversation= new mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupSchema"
    },
    messages:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'groupMessage',
        default: [],
        }
    ],
}, { timestamps: true })

const GroupConversationSchema=mongoose.model("GroupConversation",GroupConversation);

export default GroupConversationSchema;
