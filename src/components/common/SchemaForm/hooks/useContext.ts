import { createInjectionState } from '@vueuse/core'
import { SchemaFormCommonProps } from '@/components/common/SchemaForm/types/common.ts'
import { ModelRef } from 'vue'
import { get, set } from 'es-toolkit/compat'

const [ useProvideSchemaFormContext, useSchemaFormContext ] = createInjectionState((schemaFormProps: SchemaFormCommonProps, model: ModelRef<Recordable>) => {
    // const maxLabelWidth = ref(0)

    const itemsLabelMap = reactive<Map<number, number>>(new Map())

    const maxLabelWidth = computed(() => Array
        .from(itemsLabelMap.entries())
        .reduce((max, [ , value ]) => value > max ? value : max, 0)
    )

    // 获取model值
    const getModelValue = (field: string) => get(model.value, field)

    // 设置model值
    const setModelValue = (field: string, value: any) => set(model.value, field, value)

    return { schemaFormProps, model, getModelValue, setModelValue, maxLabelWidth, itemsLabelMap }
})

export { useProvideSchemaFormContext, useSchemaFormContext }
