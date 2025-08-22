import { updateClient } from "./socket/client.js";
import { getConversationSlice, updateConversationById } from "./socket/conversation.js";
import { createMessage, getMessagesByContent } from "./socket/message.js";
import { Socket } from "socket.io";
import { createWorkRequest } from "./socket/workRequest.js";

let result = '<Restult></Result>';
let precedureResult = '<precedureResult></precedureResult>';

const setPrecedureResult = (res: string) => {
    const end = precedureResult.indexOf('</precedureResult>');
    precedureResult = precedureResult.slice(0, end) + res + precedureResult.slice(end);
}

const setResult = (res: string) => {
    const end = result.indexOf('</Result>');
    result = result.slice(0, end) + res + result.slice(end);
}

const hasExtraTagInsideMessageToClient = (text: string, openTag: string, closeTag: string) => {

    const openIndex = text.indexOf(openTag);
    const closeIndex = text.indexOf(closeTag);

    const before = text.slice(0, openIndex);
    const after = text.slice(closeIndex + closeTag.length);

    return before.includes("<") || after.includes("<");

}

const hasPlainTextOutsideMessageToClient = (text: string, openTag: string, closeTag: string): boolean => {

  const openIndex = text.indexOf(openTag);
  const closeIndex = text.indexOf(closeTag);

  if (openIndex === -1 || closeIndex === -1) {
    return true;
  }

  const before = text.slice(0, openIndex).trim();
  const after = text.slice(closeIndex + closeTag.length).trim();

  return (before.replace(/<[^>]*>/g, "").trim().length > 0) ||
         (after.replace(/<[^>]*>/g, "").trim().length > 0);
}


export async function checkSymbols (response: string, socket: Socket) { console.log({response});

    precedureResult = '<precedureResult></precedureResult>';
    result = '<Restult></Result>';

    if (response.includes('<div') && !response.includes('messageToClient') && !response.includes('tellClientToWait')) {
        setPrecedureResult(`<messageFromSystem>you forgot to use <messageToClient> tag when you said "${response}" , repeat again </messageFromSystem>`);
        return precedureResult;
    }


    if (response.includes('<getMessagesByRange>')) {
        
        const start = response.indexOf('<getMessagesByRange>') + '<getMessagesByRange>'.length;
        const end = response.indexOf('</getMessagesByRange>');
        const symboles = response.slice(start, end).trim();

        const conversationIdStart = symboles.indexOf('<conversationId>') + '<conversationId>'.length;
        const conversationIdEnd = symboles.indexOf('</conversationId>');

        const startFetchingStart = symboles.indexOf('<start>') + '<start>'.length;
        const startFetchingEnd = symboles.indexOf('</start>');

        const endFetchingStart = symboles.indexOf('<end>') + '<end>'.length;
        const endFetchingEnd = symboles.indexOf('</end>');

        const id = symboles.slice(conversationIdStart, conversationIdEnd) as string;
        const startFerching = Number(symboles.slice(startFetchingStart, startFetchingEnd));
        const endFetching = Number(symboles.slice(endFetchingStart, endFetchingEnd));

        const res = await getConversationSlice(id, startFerching, endFetching);
        setPrecedureResult('<getMessagesByRange>' + res + '<getMessagesByRange/>');
        

    }

    if (response.includes('<getMessagesByContent>')) {

        const start = response.indexOf('<getMessagesByContent>') + '<getMessagesByContent>'.length;
        const end = response.indexOf('</getMessagesByContent>');
        const symboles = response.slice(start, end).trim();

        const conversationIdStart = symboles.indexOf('<conversationId>') + '<conversationId>'.length;
        const conversationIdEnd = symboles.indexOf('</conversationId>');

        const contentStart = symboles.indexOf('<content>') + '<content>'.length;
        const contentEnd = symboles.indexOf('</content>');

        const pageStart = symboles.indexOf('<page>') + '<page>'.length;
        const pageEnd = symboles.indexOf('</page>');

        const conversationId = symboles.slice(conversationIdStart, conversationIdEnd) as string;
        const content = symboles.slice(contentStart, contentEnd);
        const page = Number(symboles.slice(pageStart, pageEnd));

        const res = await getMessagesByContent(conversationId, content, page);
        setPrecedureResult('<getMessagesByContent>' + JSON.stringify(res) + '<getMessagesByContent/>');

    }

    if (response.includes('<updateConversationById>')) {
    
        const start = response.indexOf('<updateConversationById>') + '<updateConversationById>'.length;
        const end = response.indexOf('</updateConversationById>');
        const symboles = response.slice(start, end).trim();

        const idStart = symboles.indexOf('<id>') + '<id>'.length;
        const idEnd = symboles.indexOf('</id>');

        const dataStart = symboles.indexOf('<data>') + '<data>'.length;
        const dataEnd = symboles.indexOf('</data>');

        const id = symboles.slice(idStart, idEnd) as string;
        const data = symboles.slice(dataStart, dataEnd);

        try {
            const updatedData = JSON.parse(data);
            const res = await updateConversationById(id, updatedData);
            setPrecedureResult('<updateConversationById>' + res?.message + '</updateConversationById>');
            socket.emit('update-conversation', {updatedConversation: res?.conversation});
        } catch (err) {
            console.log({data});
            
            console.error('Error parsing data:', err);
            setPrecedureResult('<updateConversationById>Error parsing data: ' + err + '</updateConversationById>');
        }

    }
    
    if (response.includes('<updateClient>')) {
        const start = response.indexOf('<updateClient>') + '<updateClient>'.length;
        const end = response.indexOf('</updateClient>');
        const data = response.slice(start, end).trim();

        try {
            const updatedClientData = JSON.parse(data);
            const res = await updateClient(updatedClientData);
            setPrecedureResult('<updateClient>' + res?.message + '</updateClient>');
            // socket.emit('update-conversation', {updatedConversation: res?.conversation});
        } catch (err) {
            console.log({data});
            
            console.error('Error parsing data:', err);
            setPrecedureResult('<updateClient>Error parsing data: ' + err + '</updateClient>');
        }
    }

    if (response.includes('<createWorkRequest>')) {
        const start = response.indexOf('<createWorkRequest>') + '<createWorkRequest>'.length;
        const end = response.indexOf('</createWorkRequest>');
        const data = response.slice(start, end).trim();

        try {
            const updatedClientData = JSON.parse(data);
            const client = updatedClientData.client;
            const title = updatedClientData.title;
            const summary = updatedClientData.summary;
            const res = await createWorkRequest(title, summary, client);
            setPrecedureResult('<createWorkRequest>' + res?.message + '</createWorkRequest>');
            // socket.emit('update-conversation', {updatedConversation: res?.conversation});
        } catch (err) {
            console.log({data});
            
            console.error('Error parsing data:', err);
            setPrecedureResult('<createWorkRequest>Error parsing data: ' + err + '</createWorkRequest>');
        }
    }


    if (precedureResult != "<precedureResult></precedureResult>") {
        setResult(precedureResult);
    }

    console.log({result});
    
    return result;
    // return precedureResult == "<precedureResult></precedureResult>" ? null : precedureResult;

}