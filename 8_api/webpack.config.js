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
    publicPath: "/public/", // 해당 경로로 public path를 매핑할 때 사용
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
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
  devServer: {
    client: {
      overlay: true,
      logging: "error",
    },
    proxy: {
      "/api": "http://localhost:8081", // 모든 '/api' 관련 경로는 8081 포트로 요청
    },
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `빌드 시간 ${new Date().toLocaleString()}`,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "production" ? "프로덕션" : "개발",
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
};
