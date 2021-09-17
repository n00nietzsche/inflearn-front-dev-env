const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 실행 순서는 css-loader부터 실행됨
                    "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
        ],
    },
};
