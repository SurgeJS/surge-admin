import { ComponentsName, ComponentsNameRef, ComponentsProps } from '@/components/common/SchemaForm/types/component'
import { MaybeRef, UnwrapRef, VNode } from 'vue'
import { DrawerProps, FormInst, FormItemProps, FormItemRule, ModalProps, StepsProps } from 'naive-ui'
import { FormSetupProps } from 'naive-ui/es/form/src/Form'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { AutoCompleteGroupOption, AutoCompleteOption } from 'naive-ui/es/auto-complete/src/interface'
import type { TreeSelectOption } from 'naive-ui/es/tree-select/src/interface'
import type { MentionOption } from 'naive-ui/es/mention/src/interface'
import type { CascaderOption } from 'naive-ui/es/cascader/src/interface'
import type { Option } from 'naive-ui/es/transfer/src/interface'
import { GridItemProps, GridProps } from '@/components/common/Grid/types'

// 回调参数
export interface CallbackParams<
    TForm extends Recordable = Recordable,
    DComponentsName extends ComponentsName = ComponentsName> {
    schema: DefineSchema<TForm, DComponentsName>;

    value: any;

    model: TForm;

    field: keyof TForm;
}

// 回调参数
export interface GroupCallbackParams<
    TForm extends Recordable = Recordable,
    DComponentsName extends ComponentsName = ComponentsName> {
    group: GroupSchemaType<TForm, DComponentsName>

    model: TForm;
}

// 回调参数
export type CallbackParamsFunction<
    TForm extends Recordable = Recordable,
    DComponentsName extends ComponentsName = ComponentsName,
    R = never>
    = ((params: CallbackParams<TForm, DComponentsName>) => R)

// 组回调参数
export type GroupCallbackParamsFunction<
    TForm extends Recordable = Recordable,
    DComponentsName extends ComponentsName = ComponentsName,
    R = never>
    = ((params: GroupCallbackParams<TForm, DComponentsName>) => R)

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

export type RulePresetsType = Record<RulePresets, {
    // 必填信息
    requiredMessage: string

    // 错误信息
    incorrectMessage: string

    // 验证
    validator(value: string): boolean
}>

export type SafeComponentProps<T> = T extends Recordable ? T : never;

export type FormItemPropsRefs = MaybeRefs<Omit<FormItemProps, 'label' | 'rule' | 'path' | 'required'>>

// 通用的选项类型
export type OptionType =
    SelectMixedOption
    | AutoCompleteOption
    | AutoCompleteGroupOption
    | TreeSelectOption
    | MentionOption
    | CascaderOption
    | Option

// 常用组件属性映射
export interface CommonComponentPropsMap {
    // 占位符
    placeholder?: string

    // 日期范围组件 开始占位符
    startPlaceholder?: string

    // 日期范围组件 开始占位符
    endPlaceholder?: string

    // 选项
    options?: MaybeRef<OptionType[]>
}

// Schema配置
export interface Schema<
    TForm extends Recordable = any,
    DComponentsName extends ComponentsNameRef = ComponentsNameRef
> extends FormItemPropsRefs, CommonComponentPropsMap {
    // 字段
    field?: MaybeRef<keyof TForm | string>

    // label 标签的文本
    label?: MaybeRef<string> | SlotsContent | CallbackParamsFunction<TForm, UnwrapRef<DComponentsName>, SlotsContent>

    // 双向绑定名称
    vModelBind?: MaybeRef<string>

    // 组件
    component?: DComponentsName

    // 组件属性
    componentProps?: MaybeRefs<SafeComponentProps<ComponentsProps[UnwrapRef<DComponentsName>]>> | Recordable

    // 组件内容
    componentContent?: SlotsContent
        | ComponentSlots
        | ((callbackParams: CallbackParams<TForm, UnwrapRef<DComponentsName>>) => SlotsContent | ComponentSlots)

    // 自定义插槽
    slot?: MaybeRef<string>

    // formItem 插槽
    contentSlot?: MaybeRef<string>

    // grid item组件属性
    gridItemProps?: MaybeRef<number | GridItemProps>

    // 规则
    rule?: MaybeRef<RulePresets | FormItemRule | FormItemRule[]>

    // 该formItem是否隐藏
    hide?: MaybeRef<boolean> | CallbackParamsFunction<TForm, UnwrapRef<DComponentsName>, boolean>

    // 帮助提示信息
    tooltip?: MaybeRef<string>
}

// 定义JSON 格式配置
export type DefineSchema<
    TForm extends Recordable = any,
    DComponentsName extends ComponentsNameRef = ComponentsNameRef>
    = DComponentsName extends ComponentsNameRef ? Schema<TForm, DComponentsName> : never;

// 解包 JSON 格式配置
export type UnwrapRefSchema<
    TForm extends Recordable = any,
    DComponentsName extends ComponentsNameRef = ComponentsNameRef>
    = UnwrapRef<DefineSchema<TForm, DComponentsName>>

/* --------------通用类型-------------- */

// 通用props
export interface SchemaFormCommonProps extends Partial<Omit<FormSetupProps, 'onSubmit'>> {
    // 表单类名
    formClass?: string

    // 表单样式
    formStyle?: Partial<CSSStyleDeclaration>

    // 模型
    model: Recordable

    // grid item组件属性
    gridItemProps?: number | GridItemProps

    // grid组件属性
    gridProps?: GridProps

    // 是否隐藏操作按钮
    hideActionButton?: boolean

    // 默认日期组件格式
    defaultDateFormat?: DateFormat

    // 默认时间组件格式
    defaultTimeFormat?: DateFormat

    // 默认日期组件值格式
    defaultDateValueFormat?: DateFormat

    // 默认时间组件值格式
    defaultTimeValueFormat?: DateFormat

    // 自动placeholder (item的label的类型为string才会生效，优先级最低)
    autoPlaceholder?: boolean

    // 自动规则校验 (当required为真的时候，会根据label自动生成校验提示信息,label的类型为string才会生效，优先级最低)
    autoRules?: boolean

    // 自动标签宽度 (优先级最低)
    autoLabelWidth?: boolean

    // 标签文字溢出省略(设置固定宽度时有效)
    labelOverflowOmitted?: boolean

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
    schema: UnwrapRefSchema[]
}

export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SchemaFormSlots extends SchemaFormCommonSlots {
}

/* --------------搜索表单-------------- */

export interface SearchSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: DefineSchema[]

    // 查询表单默认展示个数
    searchShowNumber?: number
}

export interface SearchSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SearchSchemaFormSlots extends SchemaFormCommonSlots {
}

/* --------------分组表单-------------- */

// 模块表单结构
export interface GroupSchemaType<
    TForm extends Recordable = any,
    DComponentsName extends ComponentsName = ComponentsName> {
    // 模块标题
    title: MaybeRef<string>

    // 帮助提示信息
    helpMessage?: MaybeRef<string>

    // 是否隐藏
    hide?: MaybeRef<boolean> | GroupCallbackParamsFunction<TForm, DComponentsName, boolean>

    // 表单
    form: DefineSchema<TForm, DComponentsName>[]

    // 是否隐藏展开收起按钮
    isHideExpandCollapseButton?: MaybeRef<boolean>

    // 是否折叠
    isFold?: MaybeRef<boolean>

    // 禁用表单
    disabled?: MaybeRef<boolean>
}

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

// 步骤条表单结构
export interface StepSchemaType<
    TForm extends Recordable = any,
    DComponentsName extends ComponentsName = ComponentsName> {
    // 标题
    title?: MaybeRef<string>

    // 描述
    description?: MaybeRef<string>

    // 图标
    icon?: VNode

    // 表单
    form: DefineSchema<TForm, DComponentsName>[]
}

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
    schema: DefineSchema[]

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