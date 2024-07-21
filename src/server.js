"use strict";
exports.__esModule = true;
// import express = require('express');
var express_1 = require("express");
var cors_1 = require("cors");
// import cors = require('cors')
var db_1 = require("./db");
var logger_1 = require("./logger");
var app = (0, express_1["default"])();
var cookieParser = require('cookie-parser');
var port = 3001;
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
};
app.options('*', (0, cors_1["default"])(corsOptions));
app.use((0, cors_1["default"])(corsOptions));
app.use(express_1["default"].json());
app.use(cookieParser());
// // ファイルからデータを読み込む
// app.get('/readfile', (req: Request, res: Response) => {
//     res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
//     try {
//         const sessionId = req.cookies.sessionId
//         fs.readFile(`task/${sessionId}.json`, 'utf8', (err: any, data: any) => {
//             if (err) {
//                 console.log("err", err)
//                 res.status(500).send('Error reading file');
//             } else {
//                 // res.json(data);
//                 res.json(JSON.parse(data))
//             }
//         });
//     } catch (error) {
//         console.log("error", error)
//         res.status(500).send('occuried Exception');
//     }
// });
// // ファイルにデータを書き込む
// app.post('/writefile', (req: Request, res: Response) => {
//     res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
//     const jsonData = JSON.stringify(req.body, null, 4)
//     let sessionId: string | null = null
//     console.log("cookies", req.cookies)
//     console.log("cookies", req.cookies.sessionId)
//     if (req.cookies === undefined || req.cookies.sessionId === 'undefined') {
//         // sessionId生成
//         sessionId = uuidv4()
//         console.log(sessionId)
//     } else {
//         sessionId = req.cookies.sessionId
//     }
//     fs.writeFile(`task/${sessionId}.json`, jsonData, (err: any) => {
//         if (err) {
//             res.status(500).send('Error writing file');
//         } else {
//             // 3日
//             res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 * 7 });
//             res.send('File written successfully');
//         }
//     });
// });
// タスク取得
app.get('/gettask', function (req, res) {
    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    try {
        (0, db_1.getTask)().then(function (tasks) {
            res.json(tasks);
        })["catch"](function (error) {
            logger_1.logger.error("gettask", error.message);
            res.status(500).send('Error reading file');
        });
    }
    catch (error) {
        logger_1.logger.error("gettask", error);
        res.status(500).send('occuried Exception');
    }
});
// タスク追加
app.post('/addtask', function (req, res) {
    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    var task = req.body;
    try {
        (0, db_1.addTask)(task).then(function (task) {
            res.json(task);
            // res.send('File written successfully');
        })["catch"](function (error) {
            logger_1.logger.error("addtask", error.message);
            res.status(500).send('Error reading file');
        });
    }
    catch (error) {
        logger_1.logger.error("addtask", error);
        res.status(500).send('occuried Exception');
    }
});
// タスク更新
app.put('/updatetask', function (req, res) {
    try {
        var task = req.body;
        (0, db_1.updateTask)(task).then(function () {
            res.send('success');
        })["catch"](function (error) {
            logger_1.logger.error("updatetask", error.message);
            res.status(500).send('error');
        });
    }
    catch (error) {
        logger_1.logger.error("updatetask", error);
        res.status(500).send('error');
    }
});
// タスク削除
app["delete"]('/deletetask', function (req, res) {
    try {
        var taskId = req.body.taskId;
        (0, db_1.deleteTask)(taskId).then(function () {
            res.send('success');
        })["catch"](function (error) {
            logger_1.logger.error("deletetask", error.message);
            res.status(500).send('error');
        });
    }
    catch (error) {
        logger_1.logger.error("deletetask", error);
        res.status(500).send('error');
    }
});
// アプリ初期処理
app.get('/initial', function (req, res) {
    try {
        (0, db_1.initDatabase)().then(function (tasks) {
            res.json(tasks);
        })["catch"](function (error) {
            logger_1.logger.error("initial", error.message);
            res.status(500).send('Error reading file');
        });
    }
    catch (error) {
        logger_1.logger.error("initial", error);
        res.status(500).send("初期処理エラー");
    }
});
app.get('/notification', function (req, res) {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        var data = { message: "notification from backend." };
        var intervalId_1 = setInterval(function () {
            res.write("data: ".concat(JSON.stringify({ message: '定期的な通知' }), "\n\n"));
        }, 10000);
        req.on('close', function () {
            clearInterval(intervalId_1);
        });
    }
    catch (error) {
        logger_1.logger.error("notification", error);
        res.status(500).send("notification error");
    }
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
