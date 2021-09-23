module.exports = function customBabelPlugin() {
  return {
    // 보통 visitor라는 객체를 만들게 됨
    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind === "const") {
          path.node.kind = "var";
        }
      },
    },
  };
};
