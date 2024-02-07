import sqlite3 from 'sqlite3';
import fs from 'fs'
import { Task, UpdateTask } from './interface';

class Database {
    private db: sqlite3.Database | null = null;
    private currentDir = process.cwd()

    open(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.currentDir + '/db/database.db', (err) => {
                if (err) {
                    console.error('Error opening database', err);
                    reject(err);
                } else {
                    console.log('Database opened');
                    resolve();
                }
            });
        });
    }
    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        console.error('Error closing database', err);
                        reject(err);
                    } else {
                        console.log('Database closed');
                        resolve();
                    }
                });
            } else {
                reject(new Error('Database not open'));
            }
        });
    }
    init(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                // テーブル作成
                // SQLファイルの読み込みと実行
                fs.readFile(this.currentDir + '/db/init.sql', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err.message);
                        reject(err)
                    }
                    this.db!.exec(data, (err) => {
                        if (err) {
                            console.error(err.message);
                            reject(err)
                        } else {
                            console.log('SQL script executed successfully.');
                            resolve();
                        }
                    });
                });
            } else {
                reject(new Error('init error'))
            }
        })
    }
    run(sql: string, params: any[] = []): Promise<number> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.run(sql, params, function (err) {
                    if (err) {
                        console.error('Error running sql', sql);
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                });
            } else {
                reject(new Error('Database not open'));
            }
        });
    }
    get(sql: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.get(sql, params, (err, result) => {
                    if (err) {
                        console.error('Error running sql', sql);
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } else {
                reject(new Error('Database not open'));
            }
        });
    }
    all(sql: string, params: any[] = []): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        console.error('Error running sql', sql);
                        console.error(err);
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            } else {
                reject(new Error('Database not open'));
            }
        });
    }
}

// DB初期化
export async function initDatabase() {
    console.log("currentDir", process.cwd())

    const db = new Database()
    try {
        await db.open()

        await db.init()

    } catch (error) {
        console.error("DB error", error)
    } finally {
        await db.close()
    }
}

export async function getTask() {
    const db = new Database()
    try {
        await db.open()

        const tasks: Task[] = await db.all('select * from task')
        // console.log(tasks)
        return tasks
    } catch (error) {
        console.error(error)
        return null
    } finally {
        await db.close()
    }
}
// タスク追加
export async function addTask(task: Task) {
    const db = new Database()
    try {
        await db.open()
        // console.log("addTask", task)
        // const currentTime = getCurrentTime()
        const lastID = await db.run('INSERT INTO task (title, memo, limitDate, isCompleted, completionDate, progressStatus, progressRate, registerDate, updateDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [task.title, task.memo, task.limitDate, task.isCompleted, task.completionDate, task.progressStatus, task.progressRate, task.registerDate, task.updateDate])
    
        const insertedTask: Task = await db.get("SELECT * FROM task WHERE taskId = ?", [lastID]);
        return insertedTask
    } catch (error) {
        console.error(error)
    } finally {
        await db.close()
    }
}
// タスク更新
export async function updateTask(task: UpdateTask) {
    const db = new Database()
    try {
        await db.open()
        const prefixSql = 'UPDATE task SET '
        let mainSql = ''
        // console.log("isCompleted", task)
        if (task.title !== undefined) mainSql += 'title = ?, '
        if (task.memo !== undefined) mainSql += 'memo = ?, '
        if (task.limitDate !== undefined) mainSql += 'limitDate = ?, '
        if (task.isCompleted !== undefined) mainSql += 'isCompleted = ?, '
        if (task.completionDate !== undefined) mainSql += 'completionDate = ?, '
        if (task.progressStatus !== undefined) mainSql += 'progressStatus = ?, '
        if (task.progressRate !== undefined) mainSql += 'progressRate = ?, '
        // console.log("mainSql", mainSql)
        const updateList = [task.title, task.memo, task.limitDate, task.isCompleted, task.completionDate, task.progressStatus, task.progressRate, task.updateDate, task.taskId].filter(item => item !== undefined)
        await db.run(`${prefixSql}${mainSql}updateDate = ? WHERE taskId = ?`,
            updateList)
    } catch (error) {
        console.error(error)
    } finally {
        await db.close()
    }
}
// タスク削除
export async function deleteTask(taskId: number) {
    const db = new Database()
    try {
        await db.open()
        await db.run('DELETE FROM task WHERE taskId = ?', [taskId])
    } catch (error) {
        console.error(error)
    } finally {
        await db.close()
    }
}