import mongoose from 'mongoose';

const messageSchema=new mongoose.Schema(
    {
    SenderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    },
    ReceiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    },
    Message:{
    type: String,
    required:true,
    }
    //update and created by timestamps
    },{timestamps:true}
)

const Message=mongoose.model('Message',messageSchema);

export default Message;