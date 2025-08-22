import express from 'express';
import mongoConn from './connection.js';
import { MessageParams } from './types.js';
import MessageRoute from './routes/messages.js'; 
import ConversationRoute from './routes/conversation.js';
import WorkRequestRoute from './routes/workRequest.js';
// import ClientRoute from './routes/client.js';
import { primaryPrompt } from './constants/prompts.js';
import dotenv from "dotenv";
import { Server } from 'socket.io';
import cors from 'cors';
import registerSocketHandlers from './sockets/server.js';
import { Express } from 'express-serve-static-core';
import serverless from 'serverless-http';
import http from 'http';
import Client from './models/client.js';

dotenv.config();
const conn = await mongoConn;


const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  },
  transports: ['polling']
});

app.get("/", (req, res) => {
  res.send(`Server is working! at port: ${process.env.PORT || 3003}`);
  console.log(`Server is working! at port: ${process.env.PORT || 3003}`);

});

app.get("/getAllClients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.send(JSON.stringify(clients, null, 2)?? JSON.stringify(conn, null, 2))
  } catch (err) {
    res.send(err)
  }
  
});

app.use('/routes', MessageRoute);
app.use('/routes', ConversationRoute);
app.use('/routes', WorkRequestRoute);

// app.use('/routes', ClientRoute);

const port = process.env.PORT || 3003;


registerSocketHandlers(io);

console.log({primaryPrompt: primaryPrompt.length});

// const handler = serverless(app);

server.listen(port, () => {
  console.log(`Server is running at the port: ${port}`);
});

// export default handler;
