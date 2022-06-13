// https://eslint.org/docs/user-guide/getting-started
// https://github.com/vuejs/eslint-plugin-vue
// https://github.com/prettier/eslint-config-prettier
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    browser: true
  },
  rules: {}
}
