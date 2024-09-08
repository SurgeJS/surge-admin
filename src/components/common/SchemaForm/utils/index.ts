import { ComponentsName } from '@/components/common/SchemaForm/types/component'
import { RulePresets, Schema } from '@/components/common/SchemaForm/types/type'
import { Rule } from 'ant-design-vue/es/form'
import RegUtils from '@/utils/reg'
import { RuleObject } from 'ant-design-vue/es/form/interface'

// 是否Check类型的组件
export const isCheckComponent = (component: ComponentsName) => [ 'switch', 'checkbox', 'radio' ].includes(component)



// 是否输入类型的组件
export const isInputComponent = (component: ComponentsName) => [
    'input',
    'inputNumber',
    'autoComplete',
    'mentions'
].includes(component)

// 是否选择类型的组件
export const isPickComponent = (component: ComponentsName) => [
    'select',
    'cascader',
    'datePicker',
    'timePicker',
    'treeSelect'
].includes(component)

// 生成placeholder
export const generatePlaceholder = (label: Schema['label'], component: ComponentsName) => {
    if (isInputComponent(component) && typeof label === 'string') return `请输入${ label }`
    if (isPickComponent(component) && typeof label === 'string') return `请选择${ label }`
}

// 生成规则
export const generateRule = (label: Schema['label'], component: ComponentsName): RuleObject => {
    let msg: string = `${ label }是必填项`
    if (isInputComponent(component) && typeof label === 'string') msg = `请输入${ label }`
    if (isPickComponent(component) && typeof label === 'string') msg = `请选择${ label }`
    return {
        required: true,
        message: msg,
        trigger: isInputComponent(component) ? 'blur' : 'change'
    }
}

// 处理规则预设
export const handleRulePresets = (rule: RulePresets): RuleObject => {
    const rulePresets: Record<RulePresets, { requiredMessage: string, incorrectMessage: string }> = {
        mail: {
            requiredMessage: '请输入邮箱',
            incorrectMessage: '请输入合法邮箱'
        },
        phone: {
            requiredMessage: '请输入手机号',
            incorrectMessage: '请输入合法手机号'
        },
        landline: {
            requiredMessage: '请输入固定电话',
            incorrectMessage: '请输入合法固定电话'
        },
        idCard: {
            requiredMessage: '请输入身份证',
            incorrectMessage: '请输入合法身份证'
        },
        url: {
            requiredMessage: '请输入网址',
            incorrectMessage: '请输入合法网址'
        }
    }
    return {
        required: true,
        validator(_rule: Rule, value: string) {
            if (!value) return Promise.reject(rulePresets[rule].requiredMessage)
            switch (rule) {
                case 'mail':
                    if (!RegUtils.MATCH_EMAIL.test(value)) return Promise.reject(rulePresets[rule].incorrectMessage)
                    break
                case 'phone':
                    if (!RegUtils.MATCH_PHONE.test(value)) return Promise.reject(rulePresets[rule].incorrectMessage)
                    break
                case 'landline':
                    if (!RegUtils.MATCH_LANDLINE.test(value)) return Promise.reject(rulePresets[rule].incorrectMessage)
                    break
                case 'url':
                    if (!RegUtils.MATCH_URL.test(value)) return Promise.reject(rulePresets[rule].incorrectMessage)
                    break
                case 'idCard':
                    if (!RegUtils.MATCH_ID_CARD.test(value)) return Promise.reject(rulePresets[rule].incorrectMessage)
                    break
            }
            return Promise.resolve()
        },
        trigger: 'blur'
    }
}
