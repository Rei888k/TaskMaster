import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
// import { getTask } from "../../src/db";
import { Task } from "../../src/interface";
import { getTask } from "../../src/firebasedb";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {
    return new Promise((resolve, reject) => {
        try {
            getTask().then((tasks: Task[] | null) => {
                resolve({
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                    },
                    body: JSON.stringify(tasks)
                })
            }).catch((error) => {
                logger.error("gettask", error.message)
                reject({
                    statusCode: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                    },
                    body: JSON.stringify(error)
                })
            })
        } catch (error) {
            logger.error("gettask", error)
            reject({
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                },
                body: JSON.stringify(error)
            })
        }
    })
};