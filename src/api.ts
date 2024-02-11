import { Task, UpdateTask } from "./interface";

// サーバー側のエンドポイント
const API_URL = 'http://localhost:3001';

// データをバックエンドから取得するための関数
export const fetchGetTaskData = async () => {
    try {
        if (window.api && window.api.isElectron()) {

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
        if (window.api && window.api.isElectron()) {

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
        // console.log("isElectron", window.electronEnvironment, window.electronEnvironment.isElectron())
        if (window.api && window.api.isElectron()) {
            const result = await window.api.invoke('get-task');
            console.log(result)
            if (result) {
                return result;
            } else {
                throw new Error(result.error);
            }
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
        // console.log("isElectron", window.electronEnvironment, window.electronEnvironment.isElectron())
        if (window.api && window.api.isElectron()) {
            const result = await window.api.invoke('add-task', task);
            console.log(result)
            if (result) {
                return result;
            } else {
                throw new Error(result.error);
            }
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
        if (window.api && window.api.isElectron()) {
            const result = await window.api.invoke('update-task', task);
            console.log(result)
            if (result) {
                return result;
            } else {
                throw new Error(result.error);
            }
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
        if (window.api && window.api.isElectron()) {
            await window.api.invoke('delete-task', taskId);
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
        if (window.api && window.api.isElectron()) {
            await window.api.invoke('initial');

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