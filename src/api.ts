import { ipcRenderer } from "electron";
import { Task, UpdateTask } from "./interface";

// サーバー側のエンドポイント
const API_URL = 'http://localhost:3001';

// Electronを使用しているか
// let isElectron = window.require && !!window.require('electron')
const isElectron = typeof window !== 'undefined' && window.process && window.process.type;
// let isIpcRenderer = window.require('electron').ipcRenderer
console.log("isElectron", isElectron)

// データをバックエンドから取得するための関数
export const fetchGetTaskData = async () => {
    try {
        if (isElectron) {

        } else {
            const response = await fetch(`${API_URL}/readfile`, {
                method: 'GET',
                credentials: 'include', // or include
            })

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            // console.log(response)
            const payload = await response.json();
            // const parseJson = JSON.parse(payload)
            return { payload };

        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// データをバックエンドに送信するための関数（例）
export const fetchSetTaskData = async (data: any) => {
    try {
        if (isElectron) {

        } else {
            const jsonString = JSON.stringify(data.payload)
            console.log(jsonString)
            const response = await fetch(`${API_URL}/writefile`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonString,
                // credentials: 'same-origin',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            // const result = await response.json();
            const result = await response.text();
            return result;

        }
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

// データをバックエンドから取得するための関数
export const fetchGetTask = async () => {
    try {
        if (isElectron) {
            // ipcRenderer.send('gettask')
            // return new Promise((resolve, reject) => {
            //     ipcRenderer.once('gettask-response', (_, response) => {
            //         if (response.success) {
            //             resolve(response.data)
            //         } else {
            //             reject(new Error(response.error))
            //         }
            //     })
            // })
        } else {
            const response = await fetch(`${API_URL}/gettask`, {
                method: 'GET',
                // credentials: 'include', // or include
            })

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// 
export const fetchAddTask = async (task: Task) => {
    try {
        if (isElectron) {

        } else {
            const jsonString = JSON.stringify(task)
            console.log(jsonString)
            const response = await fetch(`${API_URL}/addtask`, {
                method: 'POST',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonString,
                // credentials: 'same-origin',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();

        }
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

export const fetchUpdateTask = async (task: UpdateTask) => {
    try {
        if (isElectron) {

        } else {
            const jsonString = JSON.stringify(task)
            console.log("jsonString", jsonString)
            const response = await fetch(`${API_URL}/updatetask`, {
                method: 'PUT',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonString,
                // credentials: 'same-origin',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            // const result = await response.json();
            const result = await response.text();
            return result;

        }
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

export const fetchDeleteTask = async (taskId: number) => {
    try {
        if (isElectron) {

        } else {
            const jsonString = JSON.stringify({ taskId })
            console.log(jsonString)
            const response = await fetch(`${API_URL}/deletetask`, {
                method: 'DELETE',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonString,
                // credentials: 'same-origin',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            // const result = await response.json();
            const result = await response.text();
            return result;

        }
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

export const fetchInitialProcess = async () => {
    try {
        if (isElectron) {

        } else {
            const response = await fetch(`${API_URL}/initial`, {
                method: 'GET',
            })

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}