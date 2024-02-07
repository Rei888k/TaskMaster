const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // ブラウザウィンドウを作成する。
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // アプリのindex.htmlをロードする
    //   win.loadFile('index.html');
    win.loadFile(path.join(__dirname, '../build/index.html'));
    // win.loadFile(`${__dirname}/build/index.html`);
    // win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);