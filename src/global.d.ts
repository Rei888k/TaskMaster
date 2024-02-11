export { }; // このファイルをモジュールとして扱う

declare global {
    interface Window {
        api: {
            send: (channel: string, data: any) => void;
            receive: (channel: string, func: (...args: any[]) => void) => void;
            invoke: (channel: string, data?: any) => Promise<any>;
            isElectron: () => boolean;
        };
    }
}