// 引入vue模版的eslint
import pluginVue from 'eslint-plugin-vue'
import eslint from '@eslint/js'
// ts-eslint解析器，使 eslint 可以解析 ts 语法
import tsLint from 'typescript-eslint'
// vue文件解析器
import vueParser from 'vue-eslint-parser'

export default tsLint.config(
    {
        ignores: [
            '**/node_modules/',
            '**/dist/',
            '**/public/',
            '**/.vscode/',
            '**/.idea/'
        ],
    },
    {
        extends: [
            eslint.configs.recommended,
            ...tsLint.configs.recommended,
            ...pluginVue.configs['flat/recommended']
        ],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsLint.parser,
                sourceType: 'module',
                jsxPragma: 'React',
                // 可以使用 jsx | tsx
                ecmaFeatures: { jsx: true }
            }
        },
        rules: {
            'object-curly-spacing': [ 'error', 'always' ],
            'array-bracket-spacing': [ 'error', 'always' ],
            'space-infix-ops': [ 'error' ],
            'block-spacing': [ 'error', 'always' ],
            'brace-style': [ 'error', '1tbs', { 'allowSingleLine': true } ],
            'semi': [ 'error', 'never' ],
            'no-undef': 'off',
            'quotes': [ 'error', 'single', { 'avoidEscape': true } ],
            /* -----------------------TypeScript------------------------- */
            // 静止使用 any
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            // 禁用未定义变量
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'args': 'after-used',
                    'caughtErrors': 'none',
                }
            ],
            /* -----------------------Vue------------------------- */
            // vue 属性换行
            'vue/max-attributes-per-line': [ 'error', { 'singleline': 2 } ],
            // html元素内容换行
            'vue/singleline-html-element-content-newline': 'off',
            // 多字组件名称
            'vue/multi-word-component-names': 'off',
            'vue/no-mutating-props': 'off'
        }
    }
)
