import { FormInst } from 'naive-ui'
import { SchemaFormCommonExpose } from '@/components/common/SchemaForm/types/type'
import { cloneDeep } from 'lodash-es'
import { ModelRef } from 'vue'

const useExpose = (model:ModelRef<Recordable>) => {
    const formRef = ref<FormInst>()
    const initModel = cloneDeep(model.value)
    const commonExpose: SchemaFormCommonExpose = {
        resetFields() {
            model.value = initModel
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