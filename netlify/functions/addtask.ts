import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
// import { addTask } from "../../src/db";
import { Task } from "../../src/interface";
import { addTask } from "../../src/firebasedb";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {
    console.log("調査用ログ")
    console.log(event.httpMethod)
    console.log(event.body!)

    if (event.httpMethod == "OPTIONS") {
        console.log("options")
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            },
            body: "",
        };
    }

    const task: Task = JSON.parse(event.body!);
    return new Promise((resolve, reject) => {
        try {
            addTask(task).then((task) => {
                resolve({
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    body: JSON.stringify(task)
                })
            }).catch((error) => {
                logger.error("addtask", error.message)
                reject({
                    statusCode: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    body: JSON.stringify(error)
                })
            })
        } catch (error) {
            logger.error("addtask", error)
            reject({
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*', // すべてのオリジンを許可
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                },
                body: JSON.stringify(error)
            })
        }
    })
};