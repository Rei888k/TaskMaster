import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
import { addTask } from "../../src/db";
import { Task } from "../../src/interface";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {
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