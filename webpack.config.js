// node.js의 CommonJS 를 사용한 모듈화
const path = require("path");
const HelloWorldPlugin = require("./custom-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app_amd.js",
    },
    output: {
        path: path.resolve("./dist"),
        // output 이름을 동적으로 나타낼 수 있는 효과가 있다.
        // entry는 하나가 아니라 여러 개일 수도 있어서,
        // entry가 여러 개라면 output도 여러 개다.
        filename: "[name].js",
        assetModuleFilename: "static/[name][ext]?[hash]",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 로더의 실행 순서는 뒤에서부터 앞이다.
                    "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024, // 4kb
                    },
                },
            },
        ],
    },
    plugins: [new HelloWorldPlugin({ options: true })],
};
