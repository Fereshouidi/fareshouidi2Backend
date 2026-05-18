import express from "express";
import { createWorkRequest_ } from "../midController/socket.io/workRequest.js";
const router = express.Router();


router.post('/createNewWorkRequest', async (req, res) => {
    console.log("dddddddddddddddddddddddddddddd");
    createWorkRequest_(req, res);
})



export default router;