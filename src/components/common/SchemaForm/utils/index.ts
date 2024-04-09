import { SchemaComponentsName,SchemaRenderComponent } from '@/components/common/SchemaForm/type/component'

// 渲染
export const schemaRenderComponent =
  <K extends SchemaComponentsName>
  (componentName: K,props?: SchemaRenderComponent<K>['props']): SchemaRenderComponent<K> => ({
    name: componentName,
    props: props
  })
