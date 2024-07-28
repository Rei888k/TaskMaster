// import { app } from 'electron';
import log4js from 'log4js';
import { promises as fsPromises } from 'fs';

const logPath = process.cwd()
console.log("logPath", logPath)
// dbフォルダ作成
fsPromises.mkdir(logPath + '/logs', { recursive: true }).then(() => {
    log4js.configure({
        appenders: {
            everything: {
                type: 'dateFile',
                filename: logPath + '/logs/app.log',
                pattern: '.yyyy-MM-dd-hh',
                compress: false,
                keepFileExt: true,
                maxLogSize: 10 * 1024 * 1024, // 10MB
                numBackups: 5 // 世代管理するファイル数
            },
            console: { type: 'console' },
            // file: { type: 'file', filename: 'logs/app.log' }
        },
        categories: {
            default: { appenders: ['everything', 'console'], level: 'debug' }
        }
    });    
})



export const logger = log4js.getLogger();