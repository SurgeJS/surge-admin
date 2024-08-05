import { SchemaFormEmits, SchemaFormExpose, SchemaFormProps } from '@/components/common/SchemaForm/types/type'
import { omit, set } from 'lodash-es'
import { ModelRef } from 'vue'
import { useSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'

const useSchemaFormSteps = (props: SchemaFormProps, emits: SchemaFormEmits, expose: SchemaFormExpose, activeStep: ModelRef<number>) => {
    const { getModelValue } = useSchemaFormContext()!
    // 步骤条选项
    const stepsItems = computed(() => props.stepSchema?.map(item => omit(item, ['form'])))

    // 获取当前步骤的Model
    const getCurrentStepModel = () => {
        if (!props.stepSchema) return {}

        return props.stepSchema[activeStep.value]?.form.reduce<Recordable>((currentModel, item) => {
            if (!item.field) return currentModel
            const field = item.field as string
            set(currentModel, field, getModelValue(field))
            return currentModel
        }, {})
    }

    // 上一步
    const onPre = () => {
        emits('pre', activeStep.value - 1)
    }

    // 下一步
    const onNext = () => {
        const currentModel = getCurrentStepModel()
        expose.validate()
            .then(() => {
                emits('nextSuccess', activeStep.value + 1, currentModel, props.model)
            })
            .catch((err) => emits('nextError', err))
    }

    return { stepsItems, getCurrentStepModel,onPre,onNext }
}

export default useSchemaFormSteps