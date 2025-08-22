import express from "express";
import { ClientParams } from "../../types.js";
import Client from "../../models/client.js";
import { createClient } from "../../controller/endpoint/client.js";


export const createClient_ =  async (
    // @ts-ignore
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    // @ts-ignore 
    res: Response<any, Record<string, any>, number>
) => {

    const {name, familyName, email, password} = req.body as unknown as ClientParams;

    try {
        if (!name || !familyName || !email || !password) {
            res.status(404).json({error: 'All fields are required !'})
        }

        const newClient = await createClient({
            name,
            familyName,
            email,
            password
        });

        res.status(200).json({newClient});

    } catch (err) {
        res.status(500).json({error: err});
    }


}

export const getClientBySignIn_ = async (
    // @ts-ignore
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    // @ts-ignore 
    res: Response<any, Record<string, any>, number>
) => {

    const { email, password } = req.query as unknown as ClientParams;

    console.log({ email, password });
    
    try {
        if (!email || !password) {
            return res.status(404).json({error: 'email and password are required !'})
        }

        const client = await Client.findOne({email});

        if (!client) {
            return res.status(404).json({error: "account is not found !"});
        }

        if (client?.password != password) {
            return res.status(401).json({error: "password is wrong !"});
        }

        return res.status(200).json({client});

    } catch (err) {
        res.status(500).json({error: err});
    }


}

export const getClientByToken_ = async (
    // @ts-ignore
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    // @ts-ignore 
    res: Response<any, Record<string, any>, number>
) => {

    const { token } = req.query;
    
    try {
        if (!token) {
            return res.status(404).json({error: 'token is required !'})
        }

        const client = await Client.findOne({token});

        if (!client) {
            return res.status(404).json({error: "account is not found !"});
        }

        return res.status(200).json({client});

    } catch (err) {
        res.status(500).json({error: err});
    }


}

