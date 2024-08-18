import sqlite3 from 'sqlite3';
import fs from 'fs'
import { Task, UpdateTask } from './interface';
// import { app } from 'electron';
import { promises as fsPromises } from 'fs';
import { logger } from './logger';

const initSql = `
-- タスクテーブル
CREATE TABLE IF NOT EXISTS task (
    taskId INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    memo TEXT,
    limitDate TEXT,
    isCompleted INTEGER, -- bool値
    completionDate TEXT,
    registerDate TEXT,
    updateDate TEXT
);

-- タスク詳細
CREATE TABLE IF NOT EXISTS taskdetail (
    detailId INTEGER,
    FOREIGN KEY (detailId) REFERENCES task(taskId)
);

-- タスクコメント
CREATE TABLE IF NOT EXISTS taskcomment (
    taskCommentId INTEGER PRIMARY KEY AUTOINCREMENT,
    taskId INTEGER,
    comment TEXT,
    registerDate TEXT,
    updateDate TEXT,
    FOREIGN KEY (taskId) REFERENCES taskdetail(detailId)
);

-- タグ名
CREATE TABLE IF NOT EXISTS tag (
    tagId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    registerDate TEXT,
    updateDate TEXT
);

`

class Database {
    private db: sqlite3.Database | null = null;
    private initSqlPath = process.cwd()
    // private dbPath = (typeof process !== 'undefined' && process.versions && !!process.versions.electron) ? app.getPath('userData') : process.cwd()
    private dbPath = process.cwd()
    
    open(): Promise<void> {
        return new Promise((resolve, reject) => {
            logger.info("db file path", this.dbPath)
            // dbフォルダ作成
            fsPromises.mkdir(this.dbPath + '/db', { recursive: true }).then(() => {
                this.db = new sqlite3.Database(this.dbPath + '/db/database.db', (err) => {
                    if (err) {
                        logger.error('Error opening database', err)
                        reject(err);
                    } else {
                        resolve();
                    }
                });    
            })
        });
    }
    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        logger.error('Error closing database', err)
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            } else {
                reject();
            }
        });
    }
    init(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                // テーブル作成
                // SQLファイルの読み込みと実行
                logger.info("init.sql file path", this.initSqlPath)
                // fs.readFile(this.initSqlPath + '/db/init.sql', 'utf8', (err, data) => {
                //     if (err) {
                //         logger.error(err)
                //         reject(err)
                //     }
                    // init.sqlファイルからではなく、変数からテーブルを作成する
                    this.db!.exec(initSql, (err) => {
                        if (err) {
                            logger.error(err.message)
                            reject(err)
                        } else {
                            logger.info('SQL script executed successfully.')
                            resolve();
                        }
                    });
                // });
            } else {
                reject()
            }
        })
    }
    run(sql: string, params: any[] = []): Promise<number> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.run(sql, params, function (err) {
                    if (err) {
                        logger.error("Error Sql", sql)
                        logger.error(err)
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                });
            } else {
                reject();
            }
        });
    }
    get(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.get(sql, params, (err, result) => {
                    if (err) {
                        logger.error("Error Sql", sql)
                        logger.error(err)
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } else {
                logger.error("Database not open")
                reject();
            }
        });
    }
    all(sql: string, params: any[] = []): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        logger.error("Error Sql", sql)
                        logger.error(err)
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            } else {
                logger.error("Database not open")
                reject();
            }
        });
    }
}

// DB初期化
export async function initDatabase() {
    logger.info(initDatabase.name ,"IN")
    const db = new Database()
    try {
        await db.open()

        // DB初期処理（DB作成など）
        await db.init()

        // タスクの全件取得
        const tasks: Task[] = await db.all('select * from task')

        logger.debug(tasks)
        return tasks
    } catch (error) {
        logger.error(error)
        return null
    } finally {
        await db.close()
        logger.info(initDatabase.name ,"OUT")
    }
}

export async function getTask() {
    logger.info(getTask.name, "IN")
    const db = new Database()
    try {
        await db.open()

        // タスクの全件取得
        const tasks: Task[] = await db.all('select * from task')
        
        logger.debug(tasks)
        return tasks
    } catch (error) {
        logger.error(error)
        return null
    } finally {
        await db.close()
        logger.info(getTask.name, "OUT")
    }
}
// タスク追加
export async function addTask(task: Task) {
    logger.info(addTask, "IN")
    const db = new Database()
    try {
        await db.open()

        const lastID = await db.run('INSERT INTO task (title, memo, limitDate, isCompleted, completionDate, registerDate, updateDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [task.title, task.memo, task.limitDate, task.isCompleted, task.completionDate, task.registerDate, task.updateDate])    
        const insertedTask: Task = await db.get("SELECT * FROM task WHERE taskId = ?", [lastID]);

        logger.debug(insertedTask)
        return insertedTask
    } catch (error) {
        logger.error(error)
        return null
    } finally {
        await db.close()
        logger.info(addTask, "OUT")
    }
}
// タスク更新
export async function updateTask(task: UpdateTask) {
    logger.info(updateTask.name, "IN")
    const db = new Database()
    try {
        logger.debug(task)

        await db.open()
        const prefixSql = 'UPDATE task SET '
        let mainSql = ''
        if (task.title !== undefined) mainSql += 'title = ?, '
        if (task.memo !== undefined) mainSql += 'memo = ?, '
        if (task.limitDate !== undefined) mainSql += 'limitDate = ?, '
        if (task.isCompleted !== undefined) mainSql += 'isCompleted = ?, '
        if (task.completionDate !== undefined) mainSql += 'completionDate = ?, '

        const updateList = [task.title, task.memo, task.limitDate, task.isCompleted, task.completionDate, task.updateDate, task.taskId].filter(item => item !== undefined)
        await db.run(`${prefixSql}${mainSql}updateDate = ? WHERE taskId = ?`,
            updateList)
    } catch (error) {
        logger.error(error)
    } finally {
        await db.close()
        logger.info(updateTask.name, "OUT")
    }
}
// タスク削除
export async function deleteTask(taskId: number) {
    logger.info(deleteTask.name, "IN")
    const db = new Database()
    try {
        logger.debug("taskId", taskId)
        await db.open()
        await db.run('DELETE FROM task WHERE taskId = ?', [taskId])
    } catch (error) {
        logger.error(error)
    } finally {
        await db.close()
        logger.info(deleteTask.name, "OUT")
    }
}