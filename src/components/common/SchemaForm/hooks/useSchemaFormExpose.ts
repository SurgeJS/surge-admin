import { SchemaFormEmits, SchemaFormExpose } from '@/components/common/SchemaForm/types/type'
import { FormInstance } from 'ant-design-vue/es/form'

const useSchemaFormExpose = (emits:SchemaFormEmits) => {
    const formRef = ref<FormInstance>()
    const formExpose: SchemaFormExpose = {
        validate(nameList) {
            return formRef.value!.validate(nameList)
        },
        resetFields(nameList) {
            formRef.value!.resetFields(nameList)
            emits('afterReset')
        },
        validateFields(nameList) {
            return formRef.value!.validateFields(nameList)
        },
        scrollToField(nameList, options) {
            formRef.value!.scrollToField(nameList, options)
        },
        getFieldsValue(nameList) {
            return formRef.value!.getFieldsValue(nameList)
        },
        clearValidate(nameList) {
            formRef.value!.clearValidate(nameList)
        },
    }
    return { formRef,formExpose }
}

export default useSchemaFormExpose