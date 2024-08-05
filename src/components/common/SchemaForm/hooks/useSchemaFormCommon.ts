import { computed, ModelRef } from 'vue'
import { isNumber } from 'lodash-es'
import { SchemaFormEmits, SchemaFormExpose, SchemaFormProps } from '@/components/common/SchemaForm/types/type'
import { Gutter } from 'ant-design-vue/es/grid/Row'

const useSchemaFormCommon = (props:SchemaFormProps,emits:SchemaFormEmits,expose:SchemaFormExpose,model:ModelRef<Recordable>) => {
    // 间距
    const rowGutter = computed<Gutter | [ Gutter, Gutter ]>(() => (props.schemaLayout === 'search' ? [12, 12] : 12))

    const formClassObj = computed(() => {
        const cls = {
            form: true,
            search: props.schemaLayout === 'search'
        }
        if (props.formClass) cls[props.formClass] = true
        return cls
    })
    // labelCol配置
    const labelCol = computed(() => {
        if (!props.labelWidth) return props.labelCol
        return {
            style: {
                width: isNumber(props.labelWidth)
                    ? `${ props.labelWidth }px`
                    : props.labelWidth
            }, ...props.labelCol
        }
    })

    // 提交事件
    const onSubmit = () => {
        expose.validate()
            .then(() => emits('submitSuccess', model.value))
            .catch((err) => emits('submitError', err))
    }

    return { formClassObj, labelCol,rowGutter,onSubmit }
}
export default useSchemaFormCommon