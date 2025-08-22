import { ObjectId } from "mongoose";

export interface MessageParams {
    _id?: string | object;
    role: "user" | "model";
    index: number
    parts: MessagePartsParams[];
    conversation?: ConversationParams | string | ObjectId
    client?: ClientParams | string | ObjectId
}

export interface MessageParamsForChatGPt {
    role: "user" | "system";
    content: string;
}

export interface MessageParamsForDeepSeek {
    role: "user" | "assistant";
    content: string;
}

export interface MessagePartsParams {
    text?: string;
    image?: string;
    audio?: string;
    video?: string;
    file?: string;
    toolCall?: object;
    toolResult?: object;
    toolError?: object;
    toolResponse?: object;
    toolResponseError?: object;
}

export interface ClientParams {
    _id?: string;
    name?: string;
    familyName?: string;
    email?: string;
    token?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    notes?: string
}

export interface AiNoteParams {
    _id?: string;
    client: ClientParams;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NoteContentParams {
    title: string;
    text: string;
}

export interface ConversationParams {
    _id: object | string;
    client: ClientParams | object | string;
    title?: string;
    summary?: string;
    length?: number;
    createdAt?: Date;
    updatedAt?: Date;
}



export interface ResultParams {
    status: number
    message: string
    data: object | Array<any>
}

