module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  // TODO: 프리티어 설정을 추가하세요.
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
