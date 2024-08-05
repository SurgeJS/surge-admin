import { SchemaFormEmits, SchemaFormExpose, SchemaFormProps } from '@/components/common/SchemaForm/types/type'
import { take } from 'lodash-es'
import { ModelRef } from 'vue'

const useSchemaFormSearch = (props:SchemaFormProps,emits:SchemaFormEmits,expose:SchemaFormExpose,model:ModelRef<Recordable>) => {
    // 是否展开搜索表单
    const [isExpandSearchForm, setExpandSearchForm] = useToggle()

    // 搜索Schema
    const searchSchemas = computed(() => {
        if (!props.searchShowNumber) return props.schema
        if (isExpandSearchForm.value) return props.schema
        return take(props.schema, props.searchShowNumber)
    })

    // 展开收起文案
    const searchExpandCollapse = computed(() => ({
        text: isExpandSearchForm.value ? '收起' : '展开',
        icon: isExpandSearchForm.value ? 'i-ic:outline-keyboard-arrow-up' : 'i-ic:outline-keyboard-arrow-down'
    }))

    // 查询事件
    const onSearch = () => {
        emits('search', expose.validate, model.value)
    }

    return { isExpandSearchForm,setExpandSearchForm,searchSchemas,searchExpandCollapse,onSearch }
}

export default useSchemaFormSearch