import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}

export const roomSocketMap = {};

let groupNameforBackend;

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
	console.log("userId:",userId);
    if (userId !== undefined && userId !== null) {
        userSocketMap[userId] = socket.id;
		// console.log(userSocketMap)
    }

    socket.on('join_room', (groupName) => {
        socket.join(groupName)
        console.log(groupName,"  ",socket.id);
        groupNameforBackend=groupName;
        console.log("roomIdforBackend:",groupNameforBackend)
        try {            
            // Store the mapping between room ID and socket ID
            roomSocketMap[groupName]=socket.id;
            console.log("roomSocketMap:",roomSocketMap);
        } catch (error) {
            console.error('Error setting room ID:', error);
        }
    });


    socket.on("send_MessageSocket",(data)=>{
        console.log("data:",data);
        socket.to(groupNameforBackend).emit("receive-message",data);
    })



    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        // Remove the disconnected user's socket ID from the map
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key];
                break; // Exit loop after finding the match
            }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Function to get the socket ID of the receiver based on their user ID
export const getReceiverSocketId = (receiverId) => {
	// console.log("receiverId:",receiverId);
	// console.log("userSocketMap:",userSocketMap);
	// console.log("userSocketMap[receiverId]:",userSocketMap[receiverId])
    return userSocketMap[receiverId];
};

export const provideRoomId=()=>{
    return groupNameforBackend;
}

export { app, io, server };
