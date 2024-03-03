const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        popup: path.resolve("./src/popup/Popup.tsx"),
        options: path.resolve("./src/options/Options.tsx"),
        background: path.resolve("./src/background/background.ts"),
        content: path.resolve("./src/content/content.ts"),
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
            title: "Options",
            filename: "options.html",
            chunks: ["options"],
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
