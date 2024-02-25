const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.resolve("./src/popup/index.tsx"),
        tv: path.resolve("./src/index.tsx")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /\.(scss|css)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/manifest.json", to: "../manifest.json" },
                { from: "./public/icon-16.png", to: "../icon-16.png" },
                { from: "./public/icon-48.png", to: "../icon-48.png" },
                { from: "./public/icon-128.png", to: "../icon-128.png" },
            ],
        }),
        new HTMLPlugin({
            title: "Popup",
            filename: "popup.html",
            chunks: ["popup"],
        }),
        new HTMLPlugin({
            title: "TV",
            filename: 'tv.html',
            chunks: ["tv"],
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};
