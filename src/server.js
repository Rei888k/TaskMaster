"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
// import cors from "cors";
var cors = require("cors");
var uuid_1 = require("uuid");
var app = express();
var cookieParser = require('cookie-parser');
var port = 3001;
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// ファイルからデータを読み込む
app.get('/readfile', function (req, res) {
    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    try {
        var sessionId = req.cookies.sessionId;
        fs.readFile("task/".concat(sessionId, ".json"), 'utf8', function (err, data) {
            if (err) {
                console.log("err", err);
                res.status(500).send('Error reading file');
            }
            else {
                // res.json(data);
                res.json(JSON.parse(data));
            }
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).send('occuried Exception');
    }
});
// ファイルにデータを書き込む
app.post('/writefile', function (req, res) {
    res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    var jsonData = JSON.stringify(req.body, null, 4);
    var sessionId = null;
    console.log("cookies", req.cookies);
    console.log("cookies", req.cookies.sessionId);
    if (req.cookies === undefined || req.cookies.sessionId === 'undefined') {
        // sessionId生成
        sessionId = (0, uuid_1.v4)();
        console.log(sessionId);
    }
    else {
        sessionId = req.cookies.sessionId;
    }
    fs.writeFile("task/".concat(sessionId, ".json"), jsonData, function (err) {
        if (err) {
            res.status(500).send('Error writing file');
        }
        else {
            // 3日
            res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 * 7 });
            res.send('File written successfully');
        }
    });
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
