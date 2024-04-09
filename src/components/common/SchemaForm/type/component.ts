// 自定义选择器Props
import { InputProps,SelectProps } from 'ant-design-vue'


// SchemaForm 可渲染的组件
export interface SchemaComponentsProps {
  // 输入框
  input: MaybeRefs<InputProps>

  // 选择器
  select: MaybeRefs<SelectProps>
}

// 组件名称
export type SchemaComponentsName = keyof SchemaComponentsProps

// 渲染的组件
export interface SchemaRenderComponent<K extends SchemaComponentsName = SchemaComponentsName> {
  // 组件名称
  name: K

  // 组件props
  props?: SchemaComponentsProps[K]
}
