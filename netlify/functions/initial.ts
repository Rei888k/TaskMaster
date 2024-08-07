import { Handler, HandlerResponse } from "@netlify/functions";
import { logger } from "../../src/logger";
import { initDatabase } from "../../src/db";
import { Task } from "../../src/interface";

export const handler: Handler = async (event, context): Promise<HandlerResponse> => {
    return new Promise((resolve, reject) => {
        try {
            initDatabase().then((tasks: Task[] | null) => {
                resolve({
                    statusCode: 200,
                    body: JSON.stringify(tasks)
                })
            }).catch((error) => {
                logger.error("initial", error.message)
                reject({
                    statusCode: 500,
                    body: JSON.stringify(error)
                })
            })
        } catch (error) {
            logger.error("initial", error)
            reject({
                statusCode: 500,
                body: JSON.stringify(error)
            })
        }
    })
};