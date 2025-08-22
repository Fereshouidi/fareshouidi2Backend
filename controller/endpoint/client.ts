import { error } from "console";
import Client from "../../models/client.js";
import { ClientParams } from "../../types.js";
import Conversation from "../../models/conversation.js";

export const getClientById = async (id: string) => {
    if (!id) {
        return error('ID is required');
    }

    try {
        const client = await Client.findOne({_id: id});
        if (client) {
            return client
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
}

export const getClientBySignIn = async (email: string, password: string) => {

    console.log({email, password});
    

    try {
        if (!email || !password) {
            return {error: 'email and password are required !'}
        }

        const client = await Client.findOne({email, password});

        return client;

    } catch (err) {
        return err;
    }
}

export const getClientByConversation = async (conversationId: string) => {
    if (!conversationId) {
        return error('conversationId is required');
    }

    try {
        const conversation = await Conversation.findOne({_id: conversationId}).lean();
        const client = await Client.findOne({_id: conversation?.client})
        
        if (client) {
            return client
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
}

export const createClient = async ({name, familyName, email, password}: ClientParams) => {

    if (!name || !familyName || !email || !password) {
        return error('All fields are required');
    }

    try {
        const newClient = await new Client({
            name,
            familyName,
            email,
            password
        }).save();

        if (newClient) {
            return newClient
        } else {
            return null;
        }

    } catch (err) {
        throw err;
    }
}

export const updateClient = async (updatedData: ClientParams) => {

    if (!updatedData) {
        return error('All fields are required');
    }

    try {
        const updatedClient = await Client.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
        return updatedClient;
    } catch (err) {
        throw err;
    }

}