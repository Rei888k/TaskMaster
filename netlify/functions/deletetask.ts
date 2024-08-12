import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
// import { deleteTask } from "../../src/db";
import { Task } from "../../src/interface";
import { deleteTask } from "../../src/firebasedb";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {
    const body = JSON.parse(event.body!);

    return new Promise((resolve, reject) => {
        try {
            deleteTask(body.taskId).then(() => {
                resolve({
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    },
                })
            }).catch((error) => {
                logger.error("deletetask", error.message)
                reject({
                    statusCode: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    },
                    body: JSON.stringify(error)
                })
            })
        } catch (error) {
            logger.error("deletetask", error)
            reject({
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                },
                body: JSON.stringify(error)
            })
        }
    })
};