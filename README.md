# README


## 使い方

### `npm start`

開発モードでフロントエンド側のWebアプリケーションの起動
ブラウザで表示するにはhttp://localhost:3000/を開く
実行中にソースコードに変更を加えるとページのリロードが発生します

### `npx tsc src/server.ts`

バックエンド側のソースコードをトランスパイル（TypeScriptからJavaScriptへの変換）します

### `npx nodemon src/server.ts`

バックエンド側の起動
port:3001を使用します

### `npm run electron-build`

Electron起動に必要なソースのビルドを行う
ビルド完了後、/dist配下にトランスパイル（TypeScriptからJavaScriptへの変換）された.jsファイルが生成されます

### `npm run electron-start`

開発モードでElectronによるデスクトップアプリケーションが起動します

## 開発用MEMO

corsインストール
npm install @types/cors cors --legacy-peer-deps

## リリース済みのアプリはこちら
https://github.com/Rei888k/TaskMaster/releases