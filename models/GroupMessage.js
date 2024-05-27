import mongoose from "mongoose";

const groupMessage= new mongoose.Schema({
    SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Message:{
        type:String,
        required:true,
        },
}, { timestamps: true })

const groupMessageSchema=mongoose.model("groupMessage",groupMessage);

export default groupMessageSchema;
