import { FormProps,InputProps,SelectProps } from 'ant-design-vue'


// SchemaForm 可渲染的组件
export interface SchemaComponentsProps {
  input: InputProps

  select: SelectProps
}

// 组件名称
export type SchemaComponentsName = keyof SchemaComponentsProps

// 渲染的组件
export interface SchemaRenderComponent<T extends SchemaComponentsName = SchemaComponentsName> {
  // 组件
  componentName: T

  // 组件props
  props: SchemaComponentsProps[T]
}

// Schema属性配置
export interface SchemaPropertiesConfig {
  // 渲染的组件
  renderComponent?: SchemaRenderComponent

  // 插槽
  slot?: string
}

// Schema配置
export type Schema<T extends Recordable = Recordable> = {
  [key in NoInfer<keyof T>]: SchemaPropertiesConfig
}

export interface SchemaFormProps extends FormProps {
  schema: Schema
}
