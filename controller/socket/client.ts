import { error } from "console";
import Client from "../../models/client.js";
import { ClientParams } from "../../types.js";
import Conversation from "../../models/conversation.js";
import { ObjectId } from "mongoose";

export const getClient = async (someData: ClientParams) => {

    if (!someData) {
        return new Error('someData is required');
    }

    try {
        const client = await Client.findOne(someData);
        if (client) {
            return client
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
}

export const getClientById = async (id: string | Object) => {
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

    // if (!name || !familyName || !email || !password) {
    //     return error('All fields are required');
    // }

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

    // if (!updatedData) {
    //     return error('All fields are required');
    // }

    if (!updatedData._id) {
        return {
            message: 'error : "_id" is required with the updated data !',
            updatedClient: undefined
        };
    }

    try {
        const updatedClient = await Client.findByIdAndUpdate(updatedData._id, updatedData, { new: true });

        if (!updatedClient) {
            return {
                message: "something went wrong while updating client !",
                updatedClient
            };
        }
        return {
            message: "client has been updated successfully",
            updatedClient
        };

    } catch (err) {
        return {
            message: err,
            updatedClient: undefined
        };
    }

}

export const updateNotes = async (clientId: string | ObjectId , updatedNotes: String) => {

    if (!updatedNotes) {
        return error('updatedNotes is required');
    }

    try {

        const updatedClient = await Client.findByIdAndUpdate(
            clientId,
            updatedNotes, 
            { new: true }
        );

        return {
            message: "notes has been updated successfully",
            updatedClient
        };

    } catch (err) {
        throw err;
    }

}