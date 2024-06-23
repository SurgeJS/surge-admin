import { CardProps,ColProps,DrawerProps,FormProps,ModalProps,RowProps,StepProps,StepsProps } from 'ant-design-vue'
import { NamePath,RuleObject } from 'ant-design-vue/es/form/interface'
import { ComponentsName,ComponentsProps } from '@/components/common/SchemaForm/types/component'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'
import { MaybeRef,VNode } from 'vue'
import { ColSize } from 'ant-design-vue/es/grid/Col'
import { FormExpose } from 'ant-design-vue/es/form/Form'

// 回调参数
export interface CallbackParams<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName> {
  schema: SchemaType<T,C>;
  value: any;
  model: T;
  field: keyof T;
}

// 回调参数
export interface GroupCallbackParams<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName> {
  group: GroupSchemaType<T,C>
  model: T;
}

// 回调参数
export type CallbackParamsFunction<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName,R = never> = ((params: CallbackParams<T,C>) => R)

// 组回调参数
export type GroupCallbackParamsFunction<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName,R = never> = ((params: GroupCallbackParams<T,C>) => R)

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

/**
 * 布局
 * @description search 查询表单
 * @description group 分组表单
 * @description step 步骤表单
 */
export type SchemaLayout = 'search' | 'group' | 'step'

/**
 * 布局容器
 * @description drawer 抽屉
 * @description modal 模态框
 * @description card 卡片
 */
export type SchemaLayoutContainer = 'drawer' | 'modal' | 'card' | false

// 组件部分通用Props,这里的属性会映射到组件Props中
export interface MapComponentCommonProps<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName> {
  // 禁用状态
  disabled?: MaybeRef<boolean | CallbackParamsFunction<T,C,boolean>>

  // 占位符(对 Input | Select | AutoComplete | Cascader | DatePicker | DateRangePicker | InputNumber | Mentions | TimePicker | TimeRangePicker | TreeSelect起作用)
  placeholder?: MaybeRef<string | string[]>

  // 选项(对 Select | AutoComplete | Cascader | CheckboxGroup | Mentions | RadioGroup | TreeSelect起作用)
  options?: MaybeRef<DefaultOptionType[]>

  // 日期与时间格式
  format?: MaybeRef<DateComponentFormat>

  // 绑定值格式
  valueFormat?: MaybeRef<DateComponentFormat>
}

// Schema配置
export interface SchemaConfig<T extends Recordable = Recordable,C extends ComponentsName = ComponentsName> extends MapComponentCommonProps<T,C> {
  // 字段
  field?: MaybeRef<keyof T | string>

  // label 标签的文本
  label?: MaybeRef<SlotsContent | CallbackParamsFunction<T,C,SlotsContent>>

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

  // 列属性
  colProps?: ColProps

  // 规则
  rule?: MaybeRef<RulePresets | RuleObject[] | RuleObject>

  // 必填
  required?: MaybeRef<boolean>

  // 该formItem是否隐藏
  hide?: MaybeRef<boolean | CallbackParamsFunction<T,C,boolean>>

  // label 宽度
  labelWidth?: MaybeRef<number | string>

  // 帮助提示信息
  tooltip?: MaybeRef<string>

  // 帮助提示自定义渲染
  tooltipCustomRender?: SlotsContent | CallbackParamsFunction<T,C,SlotsContent>

  // 额外的
  extra?: SlotsContent | CallbackParamsFunction<T,C,SlotsContent>
}


// JSON 格式配置
export type SchemaType<T extends Recordable = any,C extends ComponentsName = ComponentsName>
  = C extends ComponentsName ? SchemaConfig<T,C> : never;

// 模块表单结构
export interface GroupSchemaType<T extends Recordable = any,C extends ComponentsName = ComponentsName> {
  // 模块标题
  title: string

  // 帮助提示信息
  helpMessage?: string

  // 是否隐藏
  hide?: boolean | GroupCallbackParamsFunction<T,C,boolean>

  // 表单
  form: SchemaType<T,C>[]
}

// 步骤条表单结构
export interface StepSchemaType<T extends Recordable = any,C extends ComponentsName = ComponentsName> extends StepProps {
  // 表单
  form: SchemaType<T,C>[]
}

// JSON 格式配置表单参数
export type SchemaFormProps = FormProps & {
  // 表单类名
  formClass?: string

  // 表单样式
  formStyle?: Partial<CSSStyleDeclaration>

  // schema 配置
  schema?: SchemaType[]

  // 分组 schema 配置
  groupSchema?: GroupSchemaType[]

  // 步骤条 schema 配置
  stepSchema?: StepSchemaType[]

  // 模型
  model: Recordable

  // 容器
  container?: SchemaLayoutContainer

  // 容器标题
  containerTitle?: string

  // 模态框或者抽屉是否可见（传入 container 有效）
  visible?: boolean

  // 所有字段是否都必填
  required?: boolean

  labelCol?: Col

  // label 宽度
  labelWidth?: number | string

  // 列属性
  colProps?: ColProps

  // 行属性
  rowProps?: RowProps

  // 布局
  schemaLayout?: SchemaLayout

  // 提交loading
  submitLoading?: boolean

  // 是否隐藏操作按钮
  hideActionButton?: boolean

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

  // 自动label宽度
  autoLabelWidth?: boolean

  // 步骤条激活项
  currentStep?: number

  // 步骤条属性
  stepsProps?: StepsProps

  // 抽屉属性
  drawerProps?: DrawerProps

  // 模态框属性
  modalProps?: ModalProps

  // 卡片属性
  cardProps?: CardProps

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

  // 查询表单默认展示个数
  searchShowNumber?: number
}

// JSON 格式配置表单事件
export interface SchemaFormEmits {
  // 搜索事件
  (e: 'search',validate: FormExpose['validate'],model: Recordable): void

  // 提交校验成功事件
  (e: 'submitSuccess',model: Recordable): void

  // 提交校验失败事件
  (e: 'submitError',error: any): void

  // 下一步校验成功事件
  (e: 'nextSuccess',currentModel: Recordable,model: Recordable): void

  // 下一步校验失败事件
  (e: 'nextError',error: any): void

  // 上一步事件
  (e: 'pre'): void

  // 表单重置后
  (e: 'afterReset'): void
}

// JSON 格式配置表单插槽
export interface SchemaFormSlots {
  // 自定义操作按钮
  customActionButton(): any

  // 自定义按钮前面
  beforeButton(): any

  // 自定义按钮后面
  afterButton(): any

  // 模态框和抽屉的footer
  containerFooter(): any

  // 模态框、抽屉、卡片的title
  containerTitle(): any

  // 容器表单内容前
  containerFormContentBefore(): any

  // 容器表单内容后
  containerFormContentAfter(): any

  /**
   * 自定义group标题(使用了groupTitle后helpMessage会失效)
   * @param {{groupSchema: GroupSchemaType}} props
   * @returns {any}
   */
  groupTitle(props: { groupSchema: GroupSchemaType }): any
}


// JSON 格式配置表单暴露的内容
export interface SchemaFormExpose {
  // 重置表单字段
  resetFields(): any

  // 验证表单
  validate(nameList?: NamePath[]): Promise<any>

  // /**
  //  * 添加schema
  //  * @param {SchemaType} schema 配置
  //  * @param {number} index 添加到的位置，默认添加到最后
  //  * @returns {any}
  //  */
  // addByField(schema: SchemaType,index: number): any
  //
  // /**
  //  * 根据字段更新schema
  //  * @param {string} field 字段
  //  * @param {SchemaType | ((oldSchema: SchemaType) => SchemaType)} newSchema 新的配置
  //  * @returns {any}
  //  */
  // updateByField(field: string,newSchema: SchemaType | ((oldSchema: SchemaType) => SchemaType)): any
  //
  // /**
  //  * 根据字段删除schema
  //  * @param {string} field
  //  * @returns {any}
  //  */
  // removeByField(field: string): any
}