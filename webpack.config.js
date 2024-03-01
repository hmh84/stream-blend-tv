const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.resolve("./src/popup/index.tsx"),
        player: path.resolve("./src/player/index.tsx"),
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    }],
            },
            {
                exclude: /node_modules/,
                test: /\.(scss|css)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/manifest.json", to: "./manifest.json" },
                { from: "./src/assets", to: "./assets" },
            ],
        }),
        new HTMLPlugin({
            title: "Popup",
            filename: "popup.html",
            chunks: ["popup"],
        }),
        new HTMLPlugin({
            title: "Player",
            filename: 'player.html',
            chunks: ["player"],
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "[name].js",
    },
};
