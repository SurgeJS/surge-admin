import { FormProps } from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form/interface'
import { ComponentsName,ComponentsProps } from '@/components/common/SchemaForm/type/component'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'
import { MaybeRef,VNode } from 'vue'
import { ColSize } from 'ant-design-vue/es/grid/Col'

// 回调参数
export interface CallbackParams<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName> {
  schema: SchemaConfig<T,C>;
  value: any;
  model: T;
  field: keyof T;
}

// 插槽回调参数
export type CallbackParamsFunction<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName,R = never> = ((params: CallbackParams<T,C>) => R)

type ColSpanType = number | string;

// col
export type Col = ColSize & {
  style?: Partial<CSSStyleDeclaration>
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
  prefixCls?: string;
  flex?: ColSpanType;
}

// 日期、时间组件格式
export type DateComponentFormat = DateFormat | 'timestamp'

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

// 组件部分通用Props,这里的属性会映射到组件Props中
export interface MapComponentCommonProps {
  // 占位符(对 Input | Select | AutoComplete | Cascader | DatePicker | DateRangePicker | InputNumber | Mentions | TimePicker | TimeRangePicker | TreeSelect起作用)
  placeholder?: string | string[]

  // 选项(对 Select | AutoComplete | Cascader | CheckboxGroup | Mentions | RadioGroup | TreeSelect起作用)
  options?: MaybeRef<DefaultOptionType[]>

  // 日期与时间格式
  format?: DateComponentFormat

  // 绑定值格式
  valueFormat?: DateComponentFormat
}

// Schema配置
export interface SchemaConfig<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName> extends MapComponentCommonProps {
  // 字段
  field?: keyof T

  // label 标签的文本
  label?: SlotsContent | CallbackParamsFunction<T,C,SlotsContent>

  // 绑定到 v-model 的变量名称
  modelField?: string

  // 组件
  component?: C

  // 组件属性
  componentProps?: ComponentsProps[C]

  // 组件内容
  componentContent?: SlotsContent
    | ComponentSlots
    | ((callbackParams: CallbackParams<T,C>) => SlotsContent | ComponentSlots)

  // 自定义插槽
  slot?: string

  // formItem 插槽
  contentSlot?: string

  // 规则
  rule?: RulePresets | RuleObject[] | RuleObject

  // 必填
  required?: boolean

  // 该formItem是否隐藏
  hide?: boolean | CallbackParamsFunction<T,C,boolean>

  // label 宽度
  labelWidth?: number | string

  // 帮助提示信息
  helpMessage?: string

  // 帮助提示自定义渲染
  helpCustomRender?: SlotsContent | CallbackParamsFunction<T,C,SlotsContent>

  // 额外的
  extra?: SlotsContent | CallbackParamsFunction<T,C,SlotsContent>
}

export type SchemaType<T extends Recordable = any,C extends ComponentsName = ComponentsName>
  = C extends ComponentsName ? SchemaConfig<T,C> : never;

export type SchemaFormProps = FormProps & {
  // schema 配置
  schema: SchemaType[]

  // 模型
  model: Recordable

  // 所有字段是否都必填
  required?: boolean

  labelCol?: Col

  // label 宽度
  labelWidth?: number | string

  // 默认日期组件格式
  defaultDateFormat?: DateComponentFormat

  // 默认时间组件格式
  defaultTimeFormat?: DateComponentFormat

  // 默认日期组件值格式
  defaultValueDateFormat?: DateComponentFormat

  // 默认时间组件值格式
  defaultValueTimeFormat?: DateComponentFormat

  // 自动placeholder (item的label为string才会生效)
  autoPlaceholder?: boolean
}


export interface SchemaFormEmits {
  (e: 'register'): void
}
