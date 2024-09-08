<script setup lang="tsx">
import { CallbackParams, CallbackParamsFunction, Schema, SchemaType } from '@/components/common/SchemaForm/types/type'
import { useSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import { computed, isVNode, ref, unref, useSlots } from 'vue'
import { SCHEMA_RENDER_COMPONENTS } from '@/components/common/SchemaForm/utils/components'
import {
  generateRule,
  handleRulePresets,
  isCheckComponent,
  isInputComponent,
  isPickComponent,
} from '@/components/common/SchemaForm/utils'
import { get, isArray, isFunction, isNumber, isString } from 'lodash-es'
import { SchemaFormItemProps } from '@/components/common/SchemaForm/components/SchemaFormItem/types/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import { ComponentsName } from '@/components/common/SchemaForm/types/component'


const props = defineProps<SchemaFormItemProps>()

const {
  field,
  component,
  label,
  componentProps,
  componentContent,
  hide,
  rule,
  showRequireMark,
  tooltip,
  colProps,
  contentSlot,
  slot,
} = props.schema

const slots = useSlots()
const { schemaFormProps, model, getModelValue, setModelValue } = useSchemaFormContext()!
const formItemProps = useOmitProps(props.schema, [ 'field',
  'component',
  'label',
  'componentProps',
  'componentContent',
  'hide',
  'rule',
  'tooltip',
  'colProps',
  'contentSlot',
  'slot'
])

const bindValue = computed({
  get() {
    return getModelValue(unref(field))
  },
  set(value) {
    setModelValue(unref(field), value)
  }
})

// 回调参数
const callbackParams = computed<CallbackParams>(() => ({
  schema: props.schema as SchemaType,
  model: model.value,
  value: model.value[get(model.value, unref(field))],
  field: unref(field)
}))

const isHide = computed(() => callbackParamsFunction<boolean>(unref(hide)) ?? true)

const colPropsMap = computed(() => {
  const colP = colProps || schemaFormProps.colProps
  console.log(isNumber(colP) ? { span: colP } : colP)
  return isNumber(colP) ? { span: colP } : colP
})


const formItemRules = computed(() => {
  const ruleValue = unref(rule)
  if (!ruleValue) {
    const isRequire = Boolean(unref(showRequireMark) ?? schemaFormProps.showRequireMark)
    // 自动生成校验
    return schemaFormProps.autoRules && isRequire ? generateRule(unref(label), component) : undefined
  }
  // 处理规则预设
  if (typeof ruleValue === 'string') return handleRulePresets(ruleValue)
  return ruleValue
})

// formItem slots
const formItemSlots = computed(() => {
  const formItemSlots: Recordable = {}
  if (unref(label)) formItemSlots.label = () => callbackParamsFunction(unref(label))
  return formItemSlots
})

// 动态组件属性
const dynamicComponentAttribute = computed<Recordable>(() => {
  const p: Recordable = {}
  // 处理默认日期格式
  if (component === 'datePicker') {
    p.format = schemaFormProps.defaultDateFormat
    p.valueFormat = schemaFormProps.defaultValueDateFormat
  }

  // 处理默认日期格式
  if (component === 'timePicker') {
    p.format = schemaFormProps.defaultTimeFormat
    p.valueFormat = schemaFormProps.defaultValueTimeFormat
  }

  // 处理自动生成Placeholder
  if (schemaFormProps.autoPlaceholder && isString(unref(label))) {
    const placeholderDefault = {
      daterange: [ '开始日期', '结束日期' ],
      datetimerange: [ '开始日期时间', '结束日期时间' ],
      yearrange: [ '开始年', '结束年' ],
      monthrange: [ '开始月', '结束月' ],
      quarterrange: [ '开始季度', '结束季度' ],
      input:`请输入${label}`,
      select:`请选择${label}`
    }
    //  处理日期范围类型
    if (component === 'datePicker' && componentProps?.type.includes('range')) {
      p.startPlaceholder = placeholderDefault[componentProps.type][0]
      p.endPlaceholder = placeholderDefault[componentProps.type][1]
    } else if (isInputComponent(component)) {
      p.placeholder = placeholderDefault['input']
    } else if (isPickComponent(component)) {
      p.placeholder = placeholderDefault['select']
    }
  }


  return {
    ...p,
    // 声明ref会自动解包componentProps中的ref
    ...ref(componentProps).value
  }
})

// 动态组件插槽
const dynamicComponentSlots = computed(() => {
  if (!componentContent) return undefined

  // 组件默认插槽内容
  const defaultSlot = (slot: Schema['componentContent']) => ({ default: () => slot })

  const content = callbackParamsFunction(componentContent)

  if (isArray(content) || isString(content) || isVNode(content)) return defaultSlot(content)

  return content
})

// 执行回调函数并返回原值
const callbackParamsFunction = <T = never>(value: T | CallbackParamsFunction<any, any, T>) => isFunction(value)
    ? value(callbackParams.value)
    : value

// 设置 Placeholder
const setPlaceholder = (label: string, component: ComponentsName, componentProps: Recordable) => {

  const placeholderDefault = {
    daterange: [ '开始日期', '结束日期' ],
    datetimerange: [ '开始日期时间', '结束日期时间' ],
    yearrange: [ '开始年', '结束年' ],
    monthrange: [ '开始月', '结束月' ],
    quarterrange: [ '开始季度', '结束季度' ],
    input:`请输入${label}`,
    select:`请选择${label}`
  }

}

const FormItem = () => {
  const DynamicComponent = SCHEMA_RENDER_COMPONENTS[component]
  if (!DynamicComponent) return console.error(`未找到该组件：${component}`)
  const renderComponent = () => {
    return isCheckComponent(unref(component)) ?
        (
            <DynamicComponent
                v-model:checked={bindValue.value}
                v-slots={dynamicComponentSlots.value}
                {...dynamicComponentAttribute.value}>
            </DynamicComponent>
        ) :
        (
            <DynamicComponent
                v-model:value={bindValue.value}
                v-slots={dynamicComponentSlots.value}
                {...dynamicComponentAttribute.value}>
            </DynamicComponent>
        )
  }
  return (
      <n-form-item
          rules={formItemRules.value}
          path={unref(field)}
          {...formItemProps}
          v-slots={formItemSlots.value}
      >
        {contentSlot ? slots.default?.() : renderComponent()}
      </n-form-item>
  )

}
</script>

<template>
  <n-col v-if="isHide" v-bind="colPropsMap">
    <form-item v-if="!slot" />
    <slot v-else :name="slot" />
  </n-col>
</template>

<style scoped lang="scss">
:deep(.n-input-number) {
  width: 100%;
}
</style>