import { Server, Socket } from 'socket.io';
import { getAnswer_ } from '../midController/socket.io/message.js';

export default function messageSocket(socket: Socket, io: Server) {

  socket.on('send-message', async ({ conversationId, clientId, message, isWaiting, model }) => {
    getAnswer_(socket,  conversationId, clientId, message, isWaiting, model );
  });
  
}
