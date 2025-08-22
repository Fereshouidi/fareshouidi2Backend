import { Server, Socket } from 'socket.io';
import { getConversationsByClientId_ } from '../midController/socket.io/conversation.js';

export default function conversationSocket(socket: Socket, io: Server) {

  socket.on('get-conversations', async ({ clientId, limit, skip }) => {
    getConversationsByClientId_(socket,  clientId, skip, limit);
  });

  socket.on('get-conversations', async ({ clientId, limit, skip }) => {
    getConversationsByClientId_(socket,  clientId, skip, limit);
  });
  
}


// add-conversation