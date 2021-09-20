module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    amd: true,
    parserOptions: {
      sourceType: "module",
    },
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
