// 引入vue模版的eslint
import pluginVue from 'eslint-plugin-vue'
import eslint from '@eslint/js'
// ts-eslint解析器，使 eslint 可以解析 ts 语法
import tseslint from 'typescript-eslint'
// vue文件解析器
import vueParser from 'vue-eslint-parser'

export default tseslint.config({
  ignores: [
    'node_modules',
    'dist',
    'public',
    '.vscode',
    '.idea'
  ],
  // tseslint.config添加了extends扁平函数，直接用。否则是eslint9.0版本是没有extends的
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'] // vue3推荐的eslint配置
  ],
  languageOptions: {
    parser: vueParser, // 使用vue解析器，这个可以识别vue文件
    parserOptions: {
      parser: tseslint.parser, // 在vue文件上使用ts解析器
      sourceType: 'module',
      jsxPragma: 'React',
      // 可以使用 jsx | tsx
      ecmaFeatures: { jsx: true }
    }
  },
  rules: {
    'no-undef': 'off',
    /* -----------------------TypeScript------------------------- */
    // 静止使用 any
    '@typescript-eslint/no-explicit-any': 'off',
    // 禁用未定义变量
    '@typescript-eslint/no-unused-vars': 'off',
    /* -----------------------Vue------------------------- */
    // vue 属性换行
    'vue/max-attributes-per-line': [ 'error',{ 'singleline': 2 } ],
    // html元素内容换行
    'vue/singleline-html-element-content-newline': 'off',
    // 多字组件名称
    'vue/multi-word-component-names': 'off',
    // template 静止空内容
    'vue/valid-template-root': 'off',
    'vue/no-mutating-props': 'off'
  }
})
