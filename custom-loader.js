module.exports = function webpackLoaderExample(data) {
  console.log("loader 호출");
  return data.replace("console.log(", "console.error(");
};
