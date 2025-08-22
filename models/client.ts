import { randomBytes } from "crypto";
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    familyName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
        default: () => randomBytes(16).toString('hex'),
        unique: true,
    },
    notes: {
        type: String,
        default: "there is no notes yet !"
    }

}, {
  timestamps: true
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
