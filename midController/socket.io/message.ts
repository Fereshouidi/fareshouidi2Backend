import { createMessage, getLastMessage, getTextAnswer } from "../../controller/socket/message.js";
import Message from "../../models/message.js";
import { createConversation, getConversationById, getConversationLength } from "../../controller/socket/conversation.js";
import { ConversationParams, MessageParams, ClientParams } from "../../types.js";
import { custimizeClientMessage } from "../../constants/promptsComponnent/clientMessage.js";
import { Socket } from "socket.io";
import { createConversationTittle } from "../../utils/helper.js";
import { maxMessageToGet } from "../../constants/maxMessage.js";
import { summarizeConversation_updateNotes } from "../../agents/summeryAgent/agent.js";
import Client from "../../models/client.js";
import { createClient } from "../../controller/socket/client.js";

export const getAnswer_ = async (
    socket: Socket,
    conversationId: string, 
    clientId: string,
    message: string, 
    isWaiting: boolean,
    model: string
) => {


    console.log({ conversationId, clientId, message, isWaiting, model });
    
    try {

      let client = null;

      client = await Client.findOne({_id: clientId}) as ClientParams;

      if (!client) {
        client = await createClient({}) as unknown as ClientParams;
      }

      if (!client) {
        return socket.emit('receive-message', { error: 'something went wrong when getting or creating client !' });
      }

      let conversation =  null as unknown as ConversationParams;

      if (conversationId) {

        conversation = await getConversationById(conversationId) as ConversationParams;

      } else {
        const conversationTittle = await createConversationTittle(message) as unknown as string;        
        conversation = await createConversation(clientId, conversationTittle) as ConversationParams;
        conversation = {...conversation, length: 1}
        socket.emit('add-conversation', {newConversation: conversation});
      }

      if (!conversation || conversation.summary === 'undefined' !) {
        console.log('Conversation not found or could not be created.');
        return socket.emit('receive-message', { error: 'Conversation not found or could not be created.' });
      }

      const history = await Message.find({ conversation: conversation._id })
        .limit(maxMessageToGet)
        .sort({ createdAt: -1 }) as MessageParams[];

      console.log({conversation});
      
      const conversationLength = (await getConversationLength(conversation._id)) as number - 1;

      if ( conversationLength == maxMessageToGet || (conversationLength % maxMessageToGet) == 0) {

        socket.emit('receive-message', { messageToWait: 'summarazing ...' });
        const summarizedConversation = (await summarizeConversation_updateNotes(conversation, history, client)).summary;
        conversation.summary = summarizedConversation || conversation.summary;
        
      }

      const orderedHistory = history.reverse();

      const customizedClientMessage = await custimizeClientMessage(
        conversation,
        client,
        conversation.summary?? 'there is no summary !',
        message,
        isWaiting
      );

      await createMessage(
        String(conversation._id), 
        String(conversation.client), 
        'user', 
        [{text: message}], 
        'text', 
        socket
      ) as MessageParams;

      const answer = await getTextAnswer(
        conversation,
        model,
        orderedHistory,
        customizedClientMessage,
        isWaiting,
        socket
      );

      // const lastMessage = await getLastMessage(String(conversation._id));
      // const messageIndex = (await getConversationLength(conversation._id)) as number - 1;

    //   socket.emit('receive-message', { answer: lastMessage, messageIndex });

    } catch (err) {
      console.error(err);
      socket.emit('receive-message', { error: 'Internal server error' });
    }
    
}
