/** @type {import('cz-git').UserConfig} */
module.exports = {
    prompt: {
        alias: { fd: 'docs: fix typos' },
        messages: {
            type: '选择你要提交的类型 :',
            subject: '填写简短精炼的变更描述 :\n',
            body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
            confirmCommit: '是否提交或修改commit ?'
        },
        types: [
            { value: 'feat', name: 'feat:     新增功能' },
            { value: 'fix', name: 'fix:      修复缺陷' },
            { value: 'docs', name: 'docs:     文档更新' },
            { value: 'style', name: 'style:    代码格式' },
            { value: 'refactor', name: 'refactor: 代码重构' },
            { value: 'perf', name: 'perf:     性能提升' },
            { value: 'test', name: 'test:     测试相关' },
            { value: 'build', name: 'build:    构建相关' },
            { value: 'ci', name: 'ci:       持续集成' },
            { value: 'revert', name: 'revert:   回退代码' },
            { value: 'chore', name: 'chore:    其他修改' },
        ],
        allowEmptyScopes: true,
        allowBreakingChanges: [ 'feat', 'fix' ],
        skipQuestions: [ 'scope', 'breaking', 'footer', 'footerPrefix' ],
    }
}