/** @type {import('cz-git').UserConfig} */
module.exports = {
    prompt: {
        alias: { fd: 'docs: fix typos' },
        messages: {
            type: '选择你要提交的类型 :',
            subject: '填写简短精炼的变更描述 :\n',
            body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
        },
        types: [
            { value: '特性', name: 'feat:         新增功能' },
            { value: '修复', name: 'fix:          修复缺陷' },
            { value: '文档', name: 'docs:         文档变更' },
            { value: '格式', name: 'style:        代码格式' },
            { value: '重构', name: 'refactor:     代码重构' },
            { value: '性能', name: 'perf:         性能优化' },
            { value: '测试', name: 'test:         添加疏漏测试或已有测试改动' },
            { value: '构建', name: 'build:        构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
            { value: '回退', name: 'chore:        其他' },
        ],
        allowEmptyScopes: true,
        allowBreakingChanges: ['feat', 'fix'],
        skipQuestions: ['scope','breaking','footer','footerPrefix'],
    }
}