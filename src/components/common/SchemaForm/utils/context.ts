import { createInjectionState } from '@vueuse/core'
import { SchemaFormProps } from '@/components/common/SchemaForm/type/props'

const [ useProvideSchemaForm,useSchemaFormContext ] = createInjectionState((schemaFormProps: SchemaFormProps) => {
  return { schemaFormProps }
})

export { useProvideSchemaForm,useSchemaFormContext }
