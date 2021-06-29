module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error", 
      {
        "singleQuote": true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
        "semi": false, // 使用分号, 默认true
        "endOfLine": "crlf",
        "arrowParens": "avoid", // 箭头函数能不用括号就不用括号
        "endOfLine": "lf" // 不让prettier检测文件每行结束的格式.
      }
    ],
    'semi':['error','never']
  },
};
