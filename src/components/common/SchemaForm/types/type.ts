import { ComponentsName, ComponentsProps } from '@/components/common/SchemaForm/types/component'
import { MaybeRef, VNode } from 'vue'
import {
    ColProps,
    DrawerProps,
    FormInst,
    FormItemProps,
    FormItemRule,
    FormRules,
    ModalProps,
    RowProps,
    StepsProps
} from 'naive-ui'
import { FormSetupProps } from 'naive-ui/es/form/src/Form'

// 回调参数
export interface CallbackParams<TForm extends Recordable = Recordable, DComponentsName extends ComponentsName = ComponentsName> {
    schema: SchemaType<TForm, DComponentsName>;
    value: any;
    model: TForm;
    field: keyof TForm;
}

// 回调参数
export interface GroupCallbackParams<TForm extends Recordable = Recordable, DComponentsName extends ComponentsName = ComponentsName> {
    group: GroupSchemaType<TForm, DComponentsName>
    model: TForm;
}

// 回调参数
export type CallbackParamsFunction<TForm extends Recordable = Recordable, DComponentsName extends ComponentsName = ComponentsName, R = never> = ((params: CallbackParams<TForm, DComponentsName>) => R)

// 组回调参数
export type GroupCallbackParamsFunction<TForm extends Recordable = Recordable, DComponentsName extends ComponentsName = ComponentsName, R = never> = ((params: GroupCallbackParams<TForm, DComponentsName>) => R)

// 插槽内容
export type SlotsContent = string | VNode | VNode[]

// 组件插槽
export type ComponentSlots = {
    default?(): SlotsContent
} & {
    [key: string]: (...arg: any) => SlotsContent
}

/**
 * 表单规则预设
 * @description mail 邮箱
 * @description phone 手机号
 * @description landline 固定电话
 * @description idCard 身份证号
 * @description url 网址
 */
export type RulePresets = 'mail' | 'phone' | 'landline' | 'idCard' | 'url'

// Schema配置
export interface Schema<
    TForm extends Recordable = Recordable,
    DComponentsName extends ComponentsName = ComponentsName
> extends Omit<FormItemProps, 'label' | 'rule' | 'path'> {
    // 字段
    field?: keyof TForm | string

    // label 标签的文本
    label?: SlotsContent | CallbackParamsFunction<TForm, DComponentsName, SlotsContent>

    // 组件
    component?: DComponentsName

    // 组件属性
    componentProps?: ComponentsProps[DComponentsName]

    // 组件内容
    componentContent?: SlotsContent
        | ComponentSlots
        | ((callbackParams: CallbackParams<TForm, DComponentsName>) => SlotsContent | ComponentSlots)

    // 自定义插槽
    slot?: string

    // formItem 插槽
    contentSlot?: string

    // 列属性
    colProps?: number | ColProps

    // 规则 TODO: 不知道 FormRules 是个啥
    rule?: RulePresets | FormRules | FormItemRule | FormItemRule[]

    // 该formItem是否隐藏
    hide?: boolean | CallbackParamsFunction<TForm, DComponentsName, boolean>

    // 帮助提示信息
    tooltip?: string
}

// 定义 Schema 配置
// export type DefineSchema<TForm extends Recordable = Recordable, DComponentsName extends ComponentsName = ComponentsName> = MaybeRefs<SchemaType<TForm, DComponentsName>>


// JSON 格式配置
export type SchemaType<TForm extends Recordable = any, DComponentsName extends ComponentsName = ComponentsName>
    = DComponentsName extends ComponentsName ? Schema<TForm, DComponentsName> : never;

const test: SchemaType[] = [
    {
        component: 'select',
        componentProps: {
            passivelyActivated: true
        }
    }
]

// 模块表单结构
export interface GroupSchemaType<TForm extends Recordable = any, DComponentsName extends ComponentsName = ComponentsName> {
    // 模块标题
    title: MaybeRef<string>

    // 帮助提示信息
    helpMessage?: MaybeRef<string>

    // 是否隐藏
    hide?: MaybeRef<boolean> | GroupCallbackParamsFunction<TForm, DComponentsName, boolean>

    // 表单
    form: SchemaType<TForm, DComponentsName>[]

    // 是否隐藏展开收起按钮
    isHideExpandCollapseButton?: MaybeRef<boolean>

    // 是否折叠
    isFold?: MaybeRef<boolean>

    // 禁用表单 
    disabled?: MaybeRef<boolean>
}

// 步骤条表单结构 TODO: MaybeRef 未完成
export interface StepSchemaType<TForm extends Recordable = any, DComponentsName extends ComponentsName = ComponentsName> {
    // 标题
    title?: MaybeRef<string>

    // 描述
    description?: MaybeRef<string>

    // 图标
    icon?: VNode

    // 表单
    form: SchemaType<TForm, DComponentsName>[]
}

/* --------------通用类型-------------- */


// 通用props
export type SchemaFormCommonProps = Partial<FormSetupProps> & {
    // 表单类名
    formClass?: string

    // 表单样式
    formStyle?: Partial<CSSStyleDeclaration>

    // 模型
    model: Recordable

    // 列属性
    colProps?: number | ColProps

    // 行属性
    rowProps?: RowProps

    // 是否隐藏操作按钮
    hideActionButton?: boolean

    // 默认日期组件格式
    defaultDateFormat?: DateFormat

    // 默认时间组件格式
    defaultTimeFormat?: DateFormat

    // 默认日期组件值格式
    defaultValueDateFormat?: DateFormat

    // 默认时间组件值格式
    defaultValueTimeFormat?: DateFormat

    // 自动placeholder (item的label的类型为string才会生效，优先级最低)
    autoPlaceholder?: boolean

    // 自动规则校验 (当required为真的时候，会根据label自动生成校验提示信息,label的类型为string才会生效，优先级最低)
    autoRules?: boolean

    // 提交Loading
    submitLoading?: boolean

    // 提交按钮文字
    submitText?: string

    // 重置Loading
    resetLoading?: boolean

    // 重置按钮文字
    resetText?: string

    //  隐藏重置按钮
    hideReset?: boolean

    // 提交事件 (传入该事件后会覆盖 onFinish | onFinishFailed 事件)
    onSubmit?(validate: SchemaFormCommonExpose['validate'], model: Recordable): void

    // 提交表单且数据验证成功后回调事件
    onFinish?(model: Recordable): void

    // 提交表单且数据验证失败后回调事件
    onFinishFailed?(error: any): void

    // 重置方法
    onReset?(validate: SchemaFormCommonExpose['resetFields'], model: Recordable): void
}

// 通用插槽
export interface SchemaFormCommonSlots {
    // 自定义操作按钮
    customActionButton(): any

    // 自定义按钮前面
    buttonBefore(): any

    // 自定义按钮后面
    buttonAfter(): any
}

// 通用方法
export interface SchemaFormCommonExpose extends FormInst {
    resetFields(): void
}

/* --------------基础表单-------------- */

export interface SchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: SchemaType[]
}

export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SchemaFormSlots extends SchemaFormCommonSlots {
}

/* --------------搜索表单-------------- */

export interface SearchSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: SchemaType[]

    // 查询表单默认展示个数
    searchShowNumber?: number
}

export interface SearchSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SearchSchemaFormSlots extends SchemaFormCommonSlots {
}

/* --------------分组表单-------------- */

export interface GroupSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: GroupSchemaType[]
}

export interface GroupSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface GroupSchemaFormSlots extends SchemaFormCommonSlots {
    /**
     * 自定义group标题(使用后helpMessage会失效)
     * @param {{groupSchema: GroupSchemaType}} props
     * @returns {any}
     */
    groupTitle(props: { groupSchema: GroupSchemaType }): any
}


/* --------------分步表单-------------- */

export interface StepSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: StepSchemaType[]

    // 分步激活项
    active?: number

    // 分步属性
    stepsProps?: StepsProps

    // 上一步Loading
    preLoading?: boolean

    // 上一步按钮文字
    preText?: string

    // 下一步Loading
    nextLoading?: boolean

    // 下一步按钮文字
    nextText?: string

    // 上一步
    onPre?(active: number, currentModel: Recordable, expose: StepSchemaFormExpose): void

    // 下一步
    onNext?(active: number, currentModel: Recordable, expose: StepSchemaFormExpose): void
}

export interface StepSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface StepSchemaFormSlots extends SchemaFormCommonSlots {
}


/* --------------弹框表单-------------- */

export type PopupType = 'drawer' | 'modal'

export interface PopupSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: SchemaType[]

    visible?: boolean

    // 弹框类型  抽屉 | 模态框
    popupType?: PopupType

    // 弹框标题
    popupTitle?: string

    // 抽屉属性
    drawerProps?: DrawerProps

    // 模态框属性
    modalProps?: ModalProps

    // 点击遮罩层是否关闭模态框和抽屉
    maskClosable?: boolean

    // 关闭模态框和抽屉的时候重置表单
    closeResetModel?: boolean

    // 关闭模态框和抽屉的时候弹框确定是否关闭
    closeConfirm?: boolean

    // 确认弹框标题
    confirmTitle?: string

    // 确认弹框标题内容
    confirmContent?: string
}

export interface PopupSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface PopupSchemaFormSlots extends SchemaFormCommonSlots {
    // 弹框头部
    popupHeader(): any

    // 表单前
    popupFormBefore(): any

    // 表单后
    popupFormAfter(): any

    // 弹框头部
    popupFooter(): any
}