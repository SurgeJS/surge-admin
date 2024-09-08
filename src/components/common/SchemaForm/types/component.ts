import { SCHEMA_RENDER_COMPONENTS } from '@/components/common/SchemaForm/utils/components'

// 组件类型
export type ComponentsType = typeof SCHEMA_RENDER_COMPONENTS

// 组件Props类型
export type ComponentsProps = {
    [k in keyof ComponentsType]?: InstanceType<ComponentsType[k]>['$props']
}

// 组件名称
export type ComponentsName = keyof ComponentsProps
