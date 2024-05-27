import express from 'express';
import ConnectToMongo from './db/connectToMongoDB.js';
import dotenv from "dotenv";
import AuthRouter from './router/AuthRouter.js'
import bodyParser from 'body-parser';
import MessageRouter from './router/MessageRouter.js'
import cookieParser from 'cookie-parser';
import userRouter from './router/userRouter.js';
import GroupRouter from './router/GroupRouter.js'
import session from "express-session";
import cors from 'cors';
import { app,server } from './socket/socket.js'
// import authRoute from "./router/auth.js"

const PORT = process.env.PORT || 5000;
dotenv.config();
// const app=express();

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());

app.use(express.json());

app.use('/api/auth',AuthRouter);
app.use('/api/message',MessageRouter);
app.use('/api/user/',userRouter);

app.use('/api/group/',GroupRouter);

// app.use("/auth", authRoute);


server.listen(PORT,()=>{
ConnectToMongo();
console.log('server is running!');
});
