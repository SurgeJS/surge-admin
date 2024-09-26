import { ComponentsName } from '@/components/common/SchemaForm/types/component'
import { RulePresets, RulePresetsType, Schema } from '@/components/common/SchemaForm/types/type'
import RegUtils from '@/utils/reg'
import { FormItemRule } from 'naive-ui/es/form/src/interface'

const rulePresets: RulePresetsType = {
    mail: {
        requiredMessage: '请输入邮箱',
        incorrectMessage: '请输入合法邮箱',
        validator: (value: string) => RegUtils.MATCH_EMAIL.test(value)
    },
    phone: {
        requiredMessage: '请输入手机号',
        incorrectMessage: '请输入合法手机号',
        validator: (value: string) => RegUtils.MATCH_PHONE.test(value)
    },
    landline: {
        requiredMessage: '请输入固定电话',
        incorrectMessage: '请输入合法固定电话',
        validator: (value: string) => RegUtils.MATCH_LANDLINE.test(value)
    },
    idCard: {
        requiredMessage: '请输入身份证',
        incorrectMessage: '请输入合法身份证',
        validator: (value: string) => RegUtils.MATCH_ID_CARD.test(value)
    },
    url: {
        requiredMessage: '请输入网址',
        incorrectMessage: '请输入合法网址',
        validator: (value: string) => RegUtils.MATCH_URL.test(value)
    }
}

const useSchemaFormItemUtils = () => {
    // 组件的双向绑定是否是 Checked
    const isCheckedBind = (component: ComponentsName) => [ 'checkbox', 'radio' ].includes(component)

    // 是否日期组件
    const isDateComponent = (component: ComponentsName) => component === 'datePicker'

    // 是否时间组件
    const isTimeComponent = (component: ComponentsName) => component === 'timePicker'

    // 是否输入类型的组件
    const isInputComponent = (component: ComponentsName) => [
        'input',
        'inputNumber',
        'autoComplete',
        'mentions'
    ].includes(component)

    // 是否选择类型的组件
    const isPickComponent = (component: ComponentsName) => [
        'select',
        'cascader',
        'datePicker',
        'timePicker',
        'treeSelect'
    ].includes(component)

    // 需要映射 options 的组件
    const isMapOptionsComponent = (component: ComponentsName) => [
        'autoComplete',
        'cascader',
        'select',
        'mentions',
        'transfer',
        'treeSelect'
    ].includes(component)

    // 是否需要映射占位符的组件
    const isMapPlaceholderComponent = (component: ComponentsName) => [
        'input',
        'inputNumber',
        'autoComplete',
        'mentions',
        'select',
        'cascader',
        'datePicker',
        'timePicker',
        'treeSelect'
    ].includes(component)

    // 生成placeholder
    const generatePlaceholder = (label: Schema['label'], component: ComponentsName, type?: string) => {
        const placeholderDefault = {
            daterange: [ '开始日期', '结束日期' ],
            datetimerange: [ '开始日期时间', '结束日期时间' ],
            yearrange: [ '开始年', '结束年' ],
            monthrange: [ '开始月', '结束月' ],
            quarterrange: [ '开始季度', '结束季度' ],
            input: `请输入${ label }`,
            pick: `请选择${ label }`
        }

        //  处理日期范围类型
        if (isDateComponent(component) && type?.includes('range')) {
            return [ placeholderDefault[type][0], placeholderDefault[type][1] ]
        } else if (isInputComponent(component)) {
            return placeholderDefault['input']
        } else if (isPickComponent(component)) {
            return placeholderDefault['pick']
        }
    }

    // 生成规则
    const generateRule = (label: Schema['label'], component: ComponentsName): FormItemRule => {
        let msg: string = `${ label }是必填项`
        if (isInputComponent(component) && typeof label === 'string') msg = `请输入${ label }`
        if (isPickComponent(component) && typeof label === 'string') msg = `请选择${ label }`
        return {
            required: true,
            message: msg,
            type:'any',
            trigger: isInputComponent(component) ? 'blur' : 'change'
        }
    }

    // 处理规则预设
    const handleRulePresets = (rule: RulePresets): FormItemRule => ({
        required: true,
        validator(_rule: FormItemRule, value: string) {
            const { requiredMessage, incorrectMessage, validator } = rulePresets[rule]
            if (!value) return Promise.reject(requiredMessage)
            if (!validator(value)) return  Promise.reject(incorrectMessage)
            return Promise.resolve()
        },
        trigger: 'blur'
    })

    return {
        isCheckedBind,
        isDateComponent,
        isTimeComponent,
        isPickComponent,
        isInputComponent,
        isMapOptionsComponent,
        isMapPlaceholderComponent,
        generatePlaceholder,
        generateRule,
        handleRulePresets
    }
}



export default useSchemaFormItemUtils