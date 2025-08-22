import express from "express";
import Conversation from "../../models/conversation.js";
import { createConversation, getConversationLength, getConversationSlice, getClientConversationsLength } from "../../controller/socket/conversation.js";
import { ConversationParams } from "../../types.js";
import { skip } from "node:test";



export const getConversationsByClientId_ = async (
    // @ts-ignore
    socket: Socket,
    clientId: string,
    skip: number,
    limit: number
) => {

    try {
        if (!clientId) {
            return socket.emit('get-conversations-response', {error: 'clientId is required !'})
        }        

        let conversations = await Conversation.find({ client: clientId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean() as ConversationParams[];

        //add length key to the conversation
        const updatedConversations = await Promise.all(
            conversations.map(async (conversation) => {
                const length = await getConversationLength(conversation._id) as number;
                return { ...conversation, length } as ConversationParams;
            })
        );

        const clientConversationsLength = await getClientConversationsLength(clientId);

        conversations = updatedConversations;

        console.log({clientId, skip, limit});


        return socket.emit('get-conversations-response', {
            conversations,
            skip: skip + limit,
            clientConversationsLength
        })

    } catch (err) {
        console.log({err});
        return socket.emit('get-conversations-response', {error: err})        
    }


}

export const getConversationSlice_ = async (
    // @ts-ignore
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    // @ts-ignore 
    res: Response<any, Record<string, any>, number>
) => {

    const { conversationId, skip } = req.query;

    try {

        const skip_ = Number(skip);

        if (!conversationId || typeof skip_ != 'number') {
            return res.status(404).json({error: 'clientId and conversationId is required !'});
        }

        const slice = await getConversationSlice(conversationId, skip_, skip_ + 20, 'desc');

        res.status(200).json({
            slice, 
            skip: skip_ + 20
        });

    } catch (err) {
        res.status(500).json({error: err});
    }


}

// export const getConversationSlength_

