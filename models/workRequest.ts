import { timeStamp } from "console";
import mongoose from "mongoose";

const workRequestSchema = new mongoose.Schema({
    title: {
        type: String
    },
    client: {
        type: String
    },
    summary: {
        type: String
    },
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'proccessing', 'done' ]
    }
}, {
    timestamps: true
});

const WorkRequest = mongoose.model("workRequest", workRequestSchema);
export default WorkRequest;