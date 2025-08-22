import { Socket } from "socket.io";
import { createClient, getClient, getClientById } from "../../controller/socket/client.js";
import { getConversationById } from "../../controller/socket/conversation.js";
import { ClientParams } from "../../types.js";
import { error } from "console";

// @ts-ignore
export const getClient_ = async (token?: string, conversationId?: string , socket: Socket) => {
    try {
        
        let client = null;

        client = await getClient({token});

        if (!client && conversationId) {
            const conversation = await getConversationById(conversationId);
            if (!conversation?.client) return;
            client = await getClientById(conversation.client) as unknown as ClientParams;
        }

        if (!client) {
            client = await createClient({});
            socket.emit('add-client', {
                newClient: client
            });
            return;
        }

        socket.emit('get-client-response', {
            client
        })
        
    } catch (err) {
        socket.emit('get-client-response', {
            message: "something went wrong while getting the client !",
            error: err
        })
        console.log({err});
        
    }
}