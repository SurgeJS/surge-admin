const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  /* 指定如何解析语法。*/
  parser: 'vue-eslint-parser',
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // 模块化方案
    sourceType: 'module',
    jsxPragma: 'React',
    // 可以使用 jsx | tsx
    ecmaFeatures: { jsx: true }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  rules: {
    // 无未定义
    'no-undef': 'off',

    /* -----------------------TypeScript------------------------- */
    // 未使用的变量
    '@typescript-eslint/no-unused-vars': 'off',
    // 静止使用 any
    '@typescript-eslint/no-explicit-any': 'off',

    /* -----------------------Vue------------------------- */
    // vue 属性换行
    'vue/max-attributes-per-line': [ 'error',{ 'singleline': 2 } ],
    // html元素内容换行
    'vue/singleline-html-element-content-newline': 'off',
    // 多字组件名称
    'vue/multi-word-component-names': 'off',
    // template 静止空内容
    'vue/valid-template-root': 'off'
  }
})
