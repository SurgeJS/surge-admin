import { FormInst } from 'naive-ui'
import { SchemaFormCommonExpose } from '@/components/common/SchemaForm/types/type'

const useExpose = () => {
    const formRef = ref<FormInst>()
    const commonExpose: SchemaFormCommonExpose = {
        resetFields() {
        }
    } as SchemaFormCommonExpose
    
    const setExpose = () => {
        if (!formRef.value) return
        commonExpose['validate'] = formRef.value.validate
        commonExpose['restoreValidation'] = formRef.value.restoreValidation
    }

    onMounted(() => {
        setExpose()
    })

    watch(formRef, () => {
        setExpose()
    })

    return { formRef, commonExpose }
}

export default useExpose