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
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    // typescript-eslint推荐规则,
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // 禁用参数未使用报错
    '@typescript-eslint/no-unused-vars': 'off',
    // 不禁用 debugger
    '@typescript-eslint/ban-ts-comment': 'off',
    // 强制把变量的使用限制在其定义的作用域范围内
    '@typescript-eslint/ban-types': 'off',
    // 默认情况下当 if、else、for、while 或 do 不使用大括号包裹代码时，会给出警告。然而，你可以指定当块中有多条语句时才使用大括号，而当代码块中只有一条语句时只会给出警告。
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 强制在点号之前或之后换行
    '@typescript-eslint/no-empty-interface': 'off',
    // 要求使用 === 和 !==
    '@typescript-eslint/no-explicit-any': 'off',
    // 禁用 caller 或 callee
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 禁止与 null 进行比较 ,该规则旨在通过确保与 null 比较时只等于 null，而不同时等于 undefined， 来减少潜在的 bug 和 意外行为。因此，它也将标记使用 == 和 != 与
    // null比较的情况。
    '@typescript-eslint/no-use-before-define': 'off',
    // 禁用 eval()
    '@typescript-eslint/no-var-requires': 0,
    // 禁止扩展原生对象
    'array-bracket-spacing': [ 'error','always' ],
    // 禁止不必要的函数绑定
    'array-element-newline': [ 'error','consistent' ],
    // 禁用不必要的标签
    'block-scoped-var': 'error',
    // 禁止浮点小数
    'block-spacing': 'error',
    // 禁止 this 关键字在类或类对象之外出现
    'brace-style': 'error',
    // 禁用不必要的嵌套块
    'comma-dangle': [ 'error','never' ],
    // 禁止出现多个空格
    'computed-property-spacing': [ 'error','never' ],
    // 禁止多行字符串
    curly: [ 'error','multi-line' ],
    // 禁用不必要的 return await
    'dot-location': [ 'error','property' ],
    // 不允许使用逗号操作符
    'eol-last': [ 'error','always' ],
    // 禁止多余的 return 语句
    eqeqeq: [ 'error','always' ],
    // 强制在括号内使用空格
    'func-call-spacing': [ 'error','never' ],
    // 强制数组元素间出现换行
    'function-paren-newline': [ 'error','multiline' ],
    // 禁止或强制在代码块中开括号前和闭括号后有空格
    'implicit-arrow-linebreak': [ 'error','beside' ],
    // 大括号风格要求
    'jsx-quotes': [ 'error','prefer-double' ],
    // 要求使用骆驼拼写法
    'key-spacing': [ 'error',{ beforeColon: false } ],
    // 要求或禁止使用拖尾逗号
    'keyword-spacing': [ 'error',{ before: true } ],
    // 禁止或强制在计算属性中使用空格
    'line-comment-position': [ 'error',{ position: 'above' } ],
    // 要求或禁止文件末尾保留一行空行
    'lines-between-class-members': [ 'error','always' ],
    // 要求或禁止在函数标识符和其调用之间有空格
    'multiline-ternary': [ 'error','always-multiline' ],
    // 强制在函数括号内使用一致的换行
    'no-caller': 'error',
    // 强制隐式返回的箭头函数体的位置
    'no-debugger': 0,
    // 强制在 JSX 属性中使用一致的单引号或双引号
    'no-empty-function': 'error',
    // 强制在对象字面量的键和值之间使用一致的空格
    'no-eq-null': 'error',
    // 强制关键字周围空格的一致性
    'no-eval': 'error',
    // 强制行注释的位置
    'no-extend-native': 'error',
    // 要求或禁止在类成员之间出现空行
    'no-extra-bind': 'error',
    // 要求或禁止在三元操作数中间换行
    'no-extra-label': 'error',
    // 禁止使用内联注释
    'no-floating-decimal': 'error',
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-inline-comments': 'error',
    // 禁止连续赋值
    'no-invalid-this': 'error',
    // 不允许多个空行
    'no-labels': 'error',
    // 强制单个语句的位置
    'no-lone-blocks': 'error',
    // 强制在花括号中使用一致的空格
    'no-lonely-if': 'error',
    // 强制操作符使用一致的换行符风格
    'no-multi-assign': 'error',
    // 要求或禁止块内填充
    'no-multi-spaces': 'error',
    // 强制使用一致的反勾号、双引号或单引号
    'no-multi-str': 'error',
    // 要求或禁止使用分号代替 ASI
    'no-multiple-empty-lines': 'error',
    // 要求或禁止语句块之前的空格
    'no-return-await': 'error',
    // 要求或禁止函数圆括号之前有一个空格
    'no-sequences': 'error',
    // 禁止或强制圆括号内的空格
    'no-undef': 'off',
    // 要求中缀操作符周围有空格
    'no-useless-return': 'error',
    // 要求或禁止在一元操作符之前或之后存在空格
    'no-var': 'error',
    // 要求或禁止在注释前有空白
    'nonblock-statement-body-position': [ 'error','beside' ],
    // 强制在 switch 的冒号左右有空格
    'object-curly-spacing': [ 'error','always' ],
    'operator-linebreak': [ 'error','after' ],
    'padded-blocks': [ 'error','never' ],
    quotes: [ 'error','single' ],
    semi: [ 'error','never' ],
    'space-before-blocks': 'error',
    'space-before-function-paren': [ 'error',{ anonymous: 'always',named: 'never',asyncArrow: 'always' } ],
    'space-in-parens': [ 'error','never' ],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': [ 'error','always',{ markers: [ '/' ] } ],
    'switch-colon-spacing': 'error',
    'vue/attribute-hyphenation': 'off',
    'vue/attributes-order': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-indent': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 0,
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-setup-props-destructure': 'off',
    // 可以使用 any 类型
    'vue/no-v-html': 'off',
    'vue/one-component-per-file': 'off',
    // 禁止使用 var
    'vue/require-default-prop': 'off',
    // 解决使用 require() Require statement not part of import statement. 的问题
    'vue/script-setup-uses-vars': 'error',
    // 禁止出现未使用的变量
    'vue/singleline-html-element-content-newline': 'off',
    'vue/valid-template-root': 'off'
  }
})
