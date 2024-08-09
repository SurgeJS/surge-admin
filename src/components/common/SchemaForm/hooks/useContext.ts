import { createInjectionState } from '@vueuse/core'
import { SchemaFormCommonProps } from '@/components/common/SchemaForm/types/type'
import { ModelRef, ref } from 'vue'
import { get, set } from 'lodash-es'

const [useProvideSchemaFormContext,useSchemaFormContext] = createInjectionState((schemaFormProps: SchemaFormCommonProps,model: ModelRef<Recordable>) => {
  // 最大label宽度
  const maxLabelWidth = ref(0)

  // 获取model值
  const getModelValue = (field: string) => get(model.value,field)

  // 设置model值
  const setModelValue = (field: string,value: any) => set(model.value,field,value)


  return { schemaFormProps,model,getModelValue,setModelValue,maxLabelWidth }
})

export { useProvideSchemaFormContext,useSchemaFormContext }
