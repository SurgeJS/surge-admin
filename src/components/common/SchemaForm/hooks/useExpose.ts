import { FormInstance } from 'ant-design-vue/es/form'
import { SchemaFormCommonExpose } from '@/components/common/SchemaForm/types/type'

const useExpose = () => {
    const formRef = ref<FormInstance>()
    const commonExpose:SchemaFormCommonExpose = {} as  SchemaFormCommonExpose

    const setExpose = () => {
        formRef.value && Object.keys(formRef.value).forEach((key) => {
            commonExpose[key] = formRef.value![key]
        })
    }

    onMounted(() => {
        setExpose()
    })

    watch(formRef, () => {
        setExpose()
    })

    return { formRef,commonExpose }
}

export default useExpose