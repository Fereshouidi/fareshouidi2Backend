import { Server } from 'socket.io';
import messageSocket from './message.js';
import conversationSocket from './conversation.js';
import clientSoket from './client.js';

export default function registerSocketHandlers(io: Server) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    messageSocket(socket, io);

    conversationSocket(socket, io);

    clientSoket(socket, io)

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
