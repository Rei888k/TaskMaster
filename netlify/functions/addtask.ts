import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
// import { addTask } from "../../src/db";
import { Task } from "../../src/interface";
import { addTask } from "../../src/firebasedb";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {
    if (event.httpMethod == "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                'Access-Control-Allow-Methods': 'POST',
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
                    body: JSON.stringify(task)
                })
            }).catch((error) => {
                logger.error("addtask", error.message)
                reject({
                    statusCode: 500,
                    body: JSON.stringify(error)
                })
            })
        } catch (error) {
            logger.error("addtask", error)
            reject({
                statusCode: 500,
                body: JSON.stringify(error)
            })
        }
    })
};