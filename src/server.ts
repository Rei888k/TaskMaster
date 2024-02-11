// import express = require('express');
import express from 'express'
import { Request, Response } from 'express';
import * as fs from 'fs'
import cors from "cors";
// import cors = require('cors')
import { v4 as uuidv4 } from 'uuid';
import { getTask, initDatabase, addTask, updateTask, deleteTask } from './db';
import { Task, UpdateTask } from './interface';
import { logger } from './logger';
const app = express();
const cookieParser = require('cookie-parser');

const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())

// ファイルからデータを読み込む
app.get('/readfile', (req: Request, res: Response) => {
    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    try {
        const sessionId = req.cookies.sessionId
        fs.readFile(`task/${sessionId}.json`, 'utf8', (err: any, data: any) => {
            if (err) {
                console.log("err", err)
                res.status(500).send('Error reading file');
            } else {
                // res.json(data);
                res.json(JSON.parse(data))
            }
        });
    } catch (error) {
        console.log("error", error)
        res.status(500).send('occuried Exception');
    }
});

// ファイルにデータを書き込む
app.post('/writefile', (req: Request, res: Response) => {

    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    const jsonData = JSON.stringify(req.body, null, 4)

    let sessionId: string | null = null
    console.log("cookies", req.cookies)
    console.log("cookies", req.cookies.sessionId)
    if (req.cookies === undefined || req.cookies.sessionId === 'undefined') {
        // sessionId生成
        sessionId = uuidv4()
        console.log(sessionId)
    } else {
        sessionId = req.cookies.sessionId
    }

    fs.writeFile(`task/${sessionId}.json`, jsonData, (err: any) => {
        if (err) {
            res.status(500).send('Error writing file');
        } else {
            // 3日
            res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 * 7 });
            res.send('File written successfully');
        }
    });
});

// タスク取得
app.get('/gettask', (req: Request, res: Response) => {
    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    logger.debug("aaaa")
    logger.info("aaaa")
    logger.warn("aaaa")
    logger.error("aaaa")
    logger.fatal("aaaa")
    try {
        getTask().then((tasks: Task[] | null) => {
            // console.log(tasks)
            res.json(tasks)

        }).catch((error) => {
            console.error(error)
            res.status(500).send('Error reading file');
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).send('occuried Exception');
    }
});

// タスク追加
app.post('/addtask', (req: Request, res: Response) => {

    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    const task: Task = req.body
    try {
        addTask(task).then((task) => {
            res.json(task)
            // res.send('File written successfully');
        }).catch((error) => {
            console.error(error)
            res.status(500).send('Error reading file');
        })
    } catch (error) {
        console.log("error", error)
        res.status(500).send('occuried Exception');
    }
});

// タスク更新
app.put('/updatetask', (req: Request, res: Response) => {
    try {
        const task: UpdateTask = req.body
        console.log("updateTask", task)
        updateTask(task).then(() => {
            res.send('success')
        }).catch((error) => {
            console.error(error)
            res.status(500).send('error')
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('error')
    }
})

// タスク削除
app.delete('/deletetask', (req: Request, res: Response) => {
    try {
        const taskId: number = req.body.taskId
        deleteTask(taskId).then(() => {
            res.send('success')
        }).catch((error) => {
            console.error(error)
            res.status(500).send('error')
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('error')
    }
})

// アプリ初期処理
app.get('/initial', (req: Request, res: Response) => {
    try {
        logger.debug("aaaa")
        logger.info("aaaa")
        logger.warn("aaaa")
        logger.error("aaaa")
        logger.fatal("aaaa")
        initDatabase().then((tasks: Task[] | null) => {
            res.json(tasks)
        }).catch((error) => {
            console.error(error)
            res.status(500).send('Error reading file');
        })
    } catch (error) {
        console.error(error)
        res.status(500).send("初期処理エラー")
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});