import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { addTask, deleteTask, getTask, initDatabase, updateTask } from '../src/db'
import { Task, UpdateTask } from '../src/interface'

// __dirname = file:///C:/work/typescript/TaskMaster/public/
function createWindow() {
    console.log(__dirname)
    console.log(path.join(__dirname, 'preload.js'))
    console.log(path.join(__dirname, '../build/index.html'))
    // ブラウザウィンドウを作成する。
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "タスク管理",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // Reactアプリケーションをロード
    // const startUrl = process.env.ELECTRON_START_URL || url.format({
    //     pathname: path.join(__dirname, '../build/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // });
    // win.loadURL(startUrl);

    // アプリのindex.htmlをロードする
    win.loadFile(path.join(__dirname, '../../build/index.html'));
}

app.whenReady().then(() => {
    createWindow()

    ipcMain.handle('initial', async () => {
        return new Promise<void>((resolve, reject) => {
            try {
                initDatabase()
                resolve()
            } catch (error) {
                reject()
            }
        })
    })

    ipcMain.handle('get-task', async (event) => {
        return new Promise((resolve, reject) => {
            try {
                getTask().then((tasks: Task[] | null) => {
                    console.log("main.ts task")
                    console.log(tasks)
                    resolve(tasks)

                }).catch((error) => {
                    console.error(error)
                    reject(error.message)
                })
            } catch (error) {
                reject(error)
            }
        })
    })

    ipcMain.handle('add-task', async (event, task: Task) => {
        return new Promise((resolve, reject) => {
            try {
                addTask(task).then((task) => {
                    resolve(task)
                }).catch((error) => {
                    console.error(error)
                    reject(error.message)
                })
            } catch (error) {
                console.log("error", error)
                reject(error)
            }
        })
    })

    ipcMain.handle('update-task', async (event, task: UpdateTask) => {
        return new Promise((resolve, reject) => {
            try {
                updateTask(task).then(() => {
                    resolve(task)
                }).catch((error) => {
                    reject(error.message)
                })
            } catch (error) {
                reject(error)
            }
        })
    })

    ipcMain.handle('delete-task', async (event, taskId: number) => {
        return new Promise<void>((resolve, reject) => {
            try {
                deleteTask(taskId).then(() => {
                    resolve()
                }).catch((error) => {
                    reject()
                })
            } catch (error) {
                reject()
            }
        })
    })
});