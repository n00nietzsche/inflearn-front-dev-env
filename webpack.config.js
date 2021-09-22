// node.js의 CommonJS 를 사용한 모듈화
const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.js",
  },
  target: ["web", "es5"],
  output: {
    path: path.resolve("./dist"),
    // output 이름을 동적으로 나타낼 수 있는 효과가 있다.
    // entry는 하나가 아니라 여러 개일 수도 있어서,
    // entry가 여러 개라면 output도 여러 개다.
    filename: "[name].js",
    assetModuleFilename: "static/[name][ext]?[hash]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // process.env.NODE_ENV === "production"
          //   ? MiniCssExtractPlugin.loader
          //   : // 로더의 실행 순서는 뒤에서부터 앞이다.
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
      logging: "info",
    },
    onBeforeSetupMiddleware: (devServer) => {
      devServer.app.use(apiMocker("/api", "mocks/api"));
    },
    hot: true,
    // proxy: {
    //   "/api": "http://localhost:8081",
    // },
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
            name: [name]
            content: 배너 테스트
            date: ${new Date().toLocaleDateString()}
            commit version: ${childProcess.execSync(
              "git rev-parse --short HEAD"
            )}
            author: ${childProcess.execSync("git config user.name")}
            `,
    }),
    new webpack.DefinePlugin({
      DEFINE_PLUGIN_TEST: "1+1",
      DEFINE_PLUGIN_STRING: JSON.stringify("1+1"),
      SERVICE_URL: JSON.stringify("https://myservice.com/"),
    }),
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
      template: "./index.html",
      templateParameters: {
        env:
          process.env.NODE_ENV === "development" ? "(개발용)" : "(프로덕션용)",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
