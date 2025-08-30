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


const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use('/routes', MessageRoute);
app.use('/routes', ConversationRoute);
app.use('/routes', WorkRequestRoute);

const port = process.env.PORT || 3003;

app.use(cors({
  origin: "*",
}));

const conn = await mongoConn;

registerSocketHandlers(io);


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

// app.use('/routes', ClientRoute);




console.log({primaryPrompt: primaryPrompt.length});

// const handler = serverless(app);

server.listen(port, () => {
  console.log(`Server is running at the port: ${port}`);
});

// export default handler;
