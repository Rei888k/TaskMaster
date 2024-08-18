import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
// import { deleteTask } from "../../src/db";
import { deleteTask } from "../../src/firebasedb";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {

    if (event.httpMethod == "OPTIONS") {
        console.log("options")
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                'Access-Control-Allow-Methods': 'DELETE',
            },
            body: "",
        };
    }

    const body = JSON.parse(event.body!);

    return new Promise((resolve, reject) => {
        try {
            deleteTask(body.taskId).then(() => {
                resolve({
                    statusCode: 200
                })
            }).catch((error) => {
                logger.error("deletetask", error.message)
                reject({
                    statusCode: 500,
                    body: JSON.stringify(error)
                })
            })
        } catch (error) {
            logger.error("deletetask", error)
            reject({
                statusCode: 500,
                body: JSON.stringify(error)
            })
        }
    })
};