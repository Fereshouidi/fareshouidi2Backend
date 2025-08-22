import { Server, Socket } from 'socket.io';
import { getClient_ } from '../midController/socket.io/client.js';

export default function clientSoket(socket: Socket, io: Server) {

  socket.on('get-client', async ({ conversationId, token }) => {
    getClient_(token, conversationId, socket);
    console.log('hyhh');
    
  });
  
}




