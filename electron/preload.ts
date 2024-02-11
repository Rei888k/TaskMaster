import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
    'api',
    {
        send: (channel: string, data: any) => ipcRenderer.send(channel, data),
        receive: (channel: string, func: any) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        },
        invoke: (channel: string, data?: any) => {
            return ipcRenderer.invoke(channel, data)
        },
        isElectron: () => {
            return typeof process !== 'undefined' && process.versions && !!process.versions.electron;
        }

    }
)