import mongoose from "mongoose";
import { maxMessageToGet } from "../constants/maxMessage.js";

const conversationSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Client",
    },
    title: {
        type: String,
        default: "New Conversation",
    },
    summary: {
        type: String,
        default: `this conversation is shorter than ${maxMessageToGet} message .`,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

})

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;