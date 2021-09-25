// node.js의 CommonJS 를 사용한 모듈화
const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
module.exports = {
  // TODO: 환경변수 NODE_ENV에 따라 development나 production 값을 설정하세요
  mode,
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
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    // onBeforeSetupMiddleware: (devServer) => {
    //   devServer.app.use(apiMocker("/api", "mocks/api"));
    // },
    hot: true,
    proxy: {
      "/api": "http://localhost:8081",
    },
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
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
      template: "./src/index.html",
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
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js",
        },
      ],
    }),
  ],
  // TODO: 여기에 최적화 설정을 구성하세요
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  externals: {
    axios: "axios",
  },
};
