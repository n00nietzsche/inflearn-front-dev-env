// node.js의 CommonJS 를 사용한 모듈화
const path = require("path");

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
    },
};
