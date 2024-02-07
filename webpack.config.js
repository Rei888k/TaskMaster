const path = require('path');
const webpack = require('webpack');

module.exports = {
    // ビルドモード: 'development' または 'production'
    mode: 'development',

    // エントリーポイント
    entry: './src/index.tsx',

    // 出力設定
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    // Webpack 5ではNode.jsのコアモジュールの自動ポリフィルが削除されたため、
    // 必要に応じてフォールバックを設定する
    resolve: {
        fallback: {
            fs: false, // 'fs' モジュールを使用しない場合は false
            path: require.resolve('path-browserify'), // 'path' モジュールのためのポリフィル
            // その他のNode.jsのコアモジュールについても同様に設定できます
        },
    },

    // ローダーの設定
    module: {
        rules: [
            // ローダーの設定をここに追加
        ],
    },

    // プラグインの設定
    plugins: [
        // プラグインをここに追加
        // DefinePluginを使用してプロセス変数を定義することもできます
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],

    // 開発サーバの設定（必要に応じて）
    devServer: {
        contentBase: './dist',
        hot: true,
    },
};