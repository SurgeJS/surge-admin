import { createInjectionState } from '@vueuse/core'
import { SchemaFormCommonProps, SchemaItemData } from '@/components/common/SchemaForm/types/common.ts'
import { ModelRef } from 'vue'
import { get, set } from 'es-toolkit/compat'

const [ useProvideSchemaFormContext, useSchemaFormContext ] = createInjectionState((schemaFormProps: SchemaFormCommonProps, model: ModelRef<Recordable>) => {
    const itemsDataMap = reactive<Map<number, SchemaItemData>>(new Map())

    const maxLabelWidth = computed(() => Math.max(...[ ...itemsDataMap.values() ].map(value => value.labelWidth)))

    // 获取model值
    const getModelValue = (field: string) => get(model.value, field)

    // 设置model值
    const setModelValue = (field: string, value: any) => set(model.value, field, value)

    return { schemaFormProps, model, getModelValue, setModelValue, maxLabelWidth, itemsDataMap }
})

export { useProvideSchemaFormContext, useSchemaFormContext }
