import express from 'express';
import Conversation from '../models/conversationModels.js';
import Message from '../models/messageModels.js'
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
      const { getMessage } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

    //   console.log(getMessage,receiverId);

      let conversationMsg = await Conversation.findOne({ participants: { $all: [receiverId, senderId] } }).populate("messages");

      if (!conversationMsg) {
          conversationMsg = await Conversation.create({
              participants: [senderId, receiverId],
          });
      }

      // Check if getMessage is provided
      if (!getMessage) {
          return res.status(400).json({ error: 'Message is required' });
      }

      const newMessage = new Message({
          SenderId: senderId,
          ReceiverId: receiverId,
          Message: getMessage,
      });

      await newMessage.save();

      // Push newMessage to conversationMsg messages array
      conversationMsg.messages.push(newMessage._id);
      await conversationMsg.save();

    //   conversationMsg = await Conversation.findOne({ participants: { $all: [receiverId, senderId] } }).populate("messages");

      // console.log("conversationMsg:",newMessage);
      
      // SOCKET IO FUNCTIONALITY WILL GO HERE
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

      res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
      console.error('Error in sendMessage controller:', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
};



export const getMessage = async(req,res) => {
    try{
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

    // console.log(receiverId,senderId);

    const getAllMessage=await Conversation.findOne({participants:{$all:[senderId,receiverId]}}).populate('messages');
    
    // console.log("getAllMessage:",getAllMessage);

    if(!getAllMessage) return res.status(500).json({message:"nothing"});

    res.status(200).json({message:getAllMessage.messages});   

    }catch(error){
    console.log("Error is sendMessage controller:",error.message)
    console.log("internal server error") 
    }
} 