import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
// import { updateTask } from "../../src/db";
import { UpdateTask } from "../../src/interface";
import { updateTask } from "../../src/firebasedb";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {

    if (event.httpMethod == "OPTIONS") {
        console.log("options")
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                'Access-Control-Allow-Methods': 'PUT',
            },
            body: "",
        };
    }

    const task: UpdateTask = JSON.parse(event.body!);

    return new Promise((resolve, reject) => {
        try {
            updateTask(task).then(() => {
                resolve({
                    statusCode: 200
                })
            }).catch((error) => {
                logger.error("updatetask", error.message)
                reject({
                    statusCode: 500,
                    body: JSON.stringify(error)
                })
            })
        } catch (error) {
            logger.error("updatetask", error)
            reject({
                statusCode: 500,
                body: JSON.stringify(error)
            })
        }
    })
};