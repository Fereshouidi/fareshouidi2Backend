import WorkRequest from "../../models/workRequest.js";

// @ts-ignore
export const createWorkRequest = async ( title: string, summary: string, client: string | object ) => {
    try {

        // if ( !title || !client) {
        //     return new Error('both of title & client are required !');
        // }
        
        const newWorkRequest = await new WorkRequest({ title, summary, client }).save();

        if (!newWorkRequest) {
            return {
                message: "something went wrong while creating a new WorkRequest !",
                client: undefined
            };
        }
        
        return {
            message: "new WorkRequest has been created successfully",
            client: newWorkRequest.client
        };

    } catch (err) {
        console.log('error : ' + err);
        return {
            message: err,
            client: err
        };
    }
}