import { SchemaComponentsName,SchemaRenderComponent } from '@/components/common/SchemaForm/utils/type'

// 渲染
export const schemaRenderComponent = <K extends SchemaComponentsName>(componentName: K,props: SchemaRenderComponent<K>['props']): SchemaRenderComponent<K> => ({
  componentName,
  props
})
