import { FormInstance } from 'ant-design-vue/es/form'
import { SchemaFormCommonExpose } from '@/components/common/SchemaForm/types/type'

const useCommonExpose = () => {
    const formRef = ref<FormInstance>()
    const commonExpose:SchemaFormCommonExpose = {} as  SchemaFormCommonExpose

    onMounted(() => {
        formRef.value && Object.keys(formRef.value).forEach((key) => {
            commonExpose[key] = formRef.value![key]
        })
    })

    return { formRef,commonExpose }
}

export default useCommonExpose