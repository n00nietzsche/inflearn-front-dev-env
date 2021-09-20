const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"),
        // environment: {
        //     arrowFunction: false,
        //     destructuring: false,
        //     dynamicImport: false,
        //     forOf: false,
        //     module: false,
        // },
        publicPath: "./",
    },
    target: ["web", "es5"],
    module: {
        rules: [
            /**
             * TODO: SASS 코드를 사용할수 있겠끔 sass-loader를 구성하세요.
             */
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: "asset",
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    /**
     * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
     * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
     * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
     * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
     * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
     */ plugins: [
        new webpack.BannerPlugin({
            banner: `빌드 시간 ${new Date().toLocaleString()}`,
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            templateParameters: {
                env:
                    process.env.NODE_ENV === "production" ? "프로덕션" : "개발",
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
};
