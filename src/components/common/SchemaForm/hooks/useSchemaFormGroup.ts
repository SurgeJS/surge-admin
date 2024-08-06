import { GroupSchemaType, SchemaFormProps } from '@/components/common/SchemaForm/types/type'
import { ModelRef, unref } from 'vue'
import { isBoolean, isFunction } from 'lodash-es'

const useSchemaFormGroup = (props: SchemaFormProps, model: ModelRef<Recordable>) => {

    const groupSchema = computed(() => {
        return props.groupSchema?.map(item => {
            const value = { ...item }
            if (!isRef(item.isFold)) {
                value.isFold = toRef(Boolean(item.isFold))
            }
            value.form.forEach(formItem => {
                if (formItem.disabled === undefined && value.disabled !== undefined) {
                    formItem.disabled = value.disabled
                }
            })
            return value
        })
    })

    const handleGroupHide = (config: GroupSchemaType) => {
        let isHide = true
        const hide = unref(config.hide)
        if (isBoolean(hide)) isHide = !hide
        if (isFunction(hide)) isHide = !hide({ group: config, model: model.value })
        return isHide
    }

    // 展开收起文案
    const getGroupExpandCollapseText = (config: GroupSchemaType) => {
        return {
            text: unref(config.isFold) ? '展开' : '收起',
            icon: unref(config.isFold) ? 'i-ic:outline-keyboard-arrow-down' : 'i-ic:outline-keyboard-arrow-up'
        }
    }

    const setFold = (config: GroupSchemaType) => {
        if (isRef(config.isFold)) {
            config.isFold.value = !config.isFold.value
        } else {
            config.isFold = !config.isFold
        }
    }

    return { handleGroupHide, getGroupExpandCollapseText, setFold,groupSchema }
}

export default useSchemaFormGroup