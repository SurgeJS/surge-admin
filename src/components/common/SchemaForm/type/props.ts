import { FormProps } from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form/interface'
import { SchemaComponentsName,SchemaRenderComponent } from '@/components/common/SchemaForm/type/component'


// Schema属性配置
export interface SchemaPropertiesConfig {
  // label 标签的文本
  label: string

  // 渲染的组件
  renderComponent?: SchemaRenderComponent | SchemaComponentsName

  // 插槽（此属性有值时，renderComponent会无效）
  slot?: string

  // 规则
  rule?: RuleObject[] | RuleObject

  // 必填
  required?: boolean
}

// Schema配置
export type Schema<T extends Recordable = Recordable> = {
  [field in keyof T]: SchemaPropertiesConfig
}

export interface SchemaFormProps extends FormProps {
  // schema 配置
  schema: Schema

  // 模型
  model: Recordable

  // 所有字段是否都必填
  required?: boolean
}
