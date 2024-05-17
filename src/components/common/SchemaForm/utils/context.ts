import { createInjectionState } from '@vueuse/core'
import { SchemaFormProps } from '@/components/common/SchemaForm/type/props'

const [ useProvideSchemaFormContext,useSchemaFormContext ] = createInjectionState((schemaFormProps: SchemaFormProps) => {

  return { schemaFormProps }
})

export { useProvideSchemaFormContext,useSchemaFormContext }
