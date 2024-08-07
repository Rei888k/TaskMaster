import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
import { deleteTask } from "../../src/db";
import { Task } from "../../src/interface";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {
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