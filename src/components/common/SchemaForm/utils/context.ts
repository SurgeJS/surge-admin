import { createInjectionState } from '@vueuse/core'
import { SchemaFormProps } from '@/components/common/SchemaForm/type/props'
import { computed } from 'vue'
import { ColProps } from 'ant-design-vue'
import useOmitProps from '@/hooks/common/useOmitProps'

// 默认表单栅格
const DEFAULT_FORM_COL = {
  span: 24
}

// 搜索表单默认栅格
const SEARCH_FORM_COL: ColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6
}

const [ useProvideSchemaFormContext,useSchemaFormContext ] = createInjectionState((schemaFormProps: SchemaFormProps) => {
  const aFormProps = useOmitProps(schemaFormProps,[
    'formClass',
    'formStyle',
    'schema',
    'groupSchema',
    'stepSchema',
    'model',
    'container',
    'containerTitle',
    'visible',
    'required',
    'labelCol',
    'labelWidth',
    'colProps',
    'rowProps',
    'schemaLayout',
    'layout',
    'submitLoading',
    'hideActionButton',
    'defaultDateFormat',
    'defaultTimeFormat',
    'defaultValueDateFormat',
    'defaultValueTimeFormat',
    'autoPlaceholder',
    'currentStep',
    'stepsProps',
    'drawerProps',
    'modalProps',
    'cardProps'
  ])

  // 全局Col属性
  const globalColProps = computed<ColProps>(() => {
    if (schemaFormProps.colProps) return schemaFormProps.colProps

    if (schemaFormProps.schemaLayout === 'search') return SEARCH_FORM_COL

    return DEFAULT_FORM_COL
  })

  return { schemaFormProps,globalColProps,aFormProps }
})

export { useProvideSchemaFormContext,useSchemaFormContext }
