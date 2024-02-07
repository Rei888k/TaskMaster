import { ipcMain } from 'electron'
import { getTask } from './db'
import { Task } from './interface'

ipcMain.on('gettask', async (event) => {
    try {
        getTask().then((tasks: Task[] | null) => {
            console.log(tasks)
            event.reply('gettask-response', { success: true, data: tasks })

        }).catch((error) => {
            console.error(error)
            event.reply('gettask-response', { success: false, error: error.message })
        })
    } catch (error) {
        event.reply('gettask-response', { success: false, error: error })
    }
})

ipcMain.on('settask', async (event, arg) => {
    // try {
    //     setTask(taskList).then(() => {
    //         res.send('File written successfully');
    //     }).catch((error) => {
    //         console.error(error)
    //         res.status(500).send('Error reading file');
    //     })
    // } catch (error) {
    //     event.reply('gettask-response', { success: false, error: error })
    // }
})