import { createClient } from "../../controller/socket/client.js";
import { createWorkRequest } from "../../controller/socket/workRequest.js";
import Client from "../../models/client.js";
import WorkRequest from "../../models/workRequest.js";
import { ClientParams } from "../../types.js";

// @ts-ignore
export const createWorkRequest_ = async (req, res) => {
    try {
        
        const { title, summary, client } = req.body;

        console.log({ title, summary, client });
        
        let newWorkRequest = null;

        if ( !title || !client) {
            return res.status(401).json({message: 'both of client & title are required !'});
        }


        const client_ = await Client.findOne({token: client.token});
        
        if (!client_) {

            const name = client.fullName.slice(0, client.fullName.indexOf(' '));
            const familyName = client.fullName.slice(client.fullName.indexOf(' ') + 1);


            console.log({
                name, 
                familyName, 
                email: client.email, 
                password: ''
            });
            
            const newClient = (await createClient({
                name, 
                familyName, 
                email: client.email, 
                password: ''
            })) as unknown as ClientParams;

            if (!newClient._id) return 

            newWorkRequest = await createWorkRequest(title, summary, newClient._id);
        } else {
            newWorkRequest = await createWorkRequest(title, summary, client_._id);
        }

        if (!newWorkRequest) {
            return res.status(401).json({message: 'something went wrong while creating a new client !'});
        }
        
        return res.status(201).json({
            message: "new newWorkRequest has been created successfully",
            newWorkRequest,
            client: client_
        });

    } catch (err) {
        console.log('error : ' + err);
        res.status(500).json({error: err})
    }
}