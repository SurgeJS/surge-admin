import { SchemaFormCommonExpose } from '@/components/common/SchemaForm/types/type'

const useExpose = () => {
    const formRef = ref<SchemaFormCommonExpose>()
    const commonExpose: SchemaFormCommonExpose = {} as SchemaFormCommonExpose

    const setExpose = () => {
        const expose = formRef.value
        if (!expose) return
        Object.keys(expose).forEach((key) => {
            commonExpose[key] = expose[key]
        })
    }

    onMounted(() => {
        setExpose()
    })

    return { formRef, commonExpose }
}

export default useExpose