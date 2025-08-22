import mongoose from "mongoose";

const messagePartsSchema = new mongoose.Schema({
    text: {
        type: String || null,
    },
    image: {
        type: String || null,
    },
    audio: {
        type: String || null,
    },
    video: {
        type: String || null,
    },
    file: {
        type: String || null,
    },
    toolCall: {
        type: Object || null,
    },
    toolResult: {
        type: Object || null,
    },
    toolError: {
        type: Object || null,
    },
    toolResponse: {
        type: Object || null,
    },
    toolResponseError: {
        type: Object || null,
    }
});

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "model"],
        required: true,
    },
    parts: {
        type: [messagePartsSchema],
        _id: false,
        required: true,
    },
    index: {
        type: Number
    },
    type: {
        type: String,
        enum: ["primaryPrompt", "primaryResponse", "text", "image", "audio", "video", "file", "toolCall", "toolResult", "toolError", "toolResponse", "toolResponseError"],
        required: true,
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
}, {
  timestamps: true
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
export { messagePartsSchema, messageSchema };