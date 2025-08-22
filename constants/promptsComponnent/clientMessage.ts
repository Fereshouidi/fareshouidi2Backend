import { error } from "console";
// import { getNoteByClientId } from "../../controller/endpoint/aiNote.js";
import { getConversationLength } from "../../controller/endpoint/conversation.js";
import { AiNoteParams, ConversationParams, NoteContentParams, ClientParams } from "../../types.js";
import { ObjectId } from "mongoose";
import { getClientById } from "../../controller/socket/client.js";


export const custimizeClientMessage = async (conversation: ConversationParams, client: ClientParams, summarizedConversation: string, message: string, isWaiting: boolean) => { 
    
    const messageIndex = await getConversationLength(conversation._id);

    return `

        بيانات المستخدم {
            ${client?? 'not exist'}
        }

        معرف المحادثة {
            ${conversation._id}
        }

        ملخص المحادثة {
            ${summarizedConversation}
        }

        رسالة المستخدم {
            <messageFromClient>${message}</messageFromClient>
        }

        رقم الرسالة {
            ${messageIndex}
        }
        دفتر الملاحظات العام {
            don't forget to use the functional Symbols to speak to the client
        }


        تاريخ ارسال الرسالة {
            ${new Date()}
        }

        


`
};
