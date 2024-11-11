import { SchemaFormCommonExpose } from '@/components/common/SchemaForm/types/common.ts'

const useExpose = () => {
    const formRef = ref<SchemaFormCommonExpose>()
    const commonExpose: SchemaFormCommonExpose = {} as SchemaFormCommonExpose

    watchEffect(() => {
        const expose = formRef.value
        if (!expose) return
        Object.keys(expose).forEach((key) => {
            commonExpose[key] = expose[key]
        })
    })

    return { formRef, commonExpose }
}

export default useExpose