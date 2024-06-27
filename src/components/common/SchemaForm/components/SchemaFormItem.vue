<script setup lang="tsx">
import {
  CallbackParams,
  CallbackParamsFunction,
  Col,
  MapComponentCommonProps,
  SchemaConfig,
  SchemaType
} from '@/components/common/SchemaForm/types/type'
import {useSchemaFormContext} from '@/components/common/SchemaForm/utils/context'
import {ComponentPublicInstance, computed, isVNode, nextTick, ref, unref, useSlots, watch} from 'vue'
import {SCHEMA_RENDER_COMPONENTS} from '@/components/common/SchemaForm/utils/components'
import {
  generatePlaceholder,
  handleRulePresets,
  isCheckComponent,
  isDateComponent,
  isMapOptions,
  isMapPlaceholder,
  isTimeComponent
} from '@/components/common/SchemaForm/utils'
import {get, isArray, isFunction, isNumber, isString} from 'lodash-es'
import {objectPathToArray} from '@/utils'

const {schema} = defineProps<{ schema: Required<SchemaConfig> }>()


const {
  field,
  component,
  label,
  options,
  placeholder,
  format,
  valueFormat,
  componentProps,
  componentContent,
  hide,
  rule,
  required,
  labelWidth,
  tooltip,
  colProps,
  tooltipCustomRender,
  extra,
  contentSlot,
  slot,
  disabled
} = schema

const slots = useSlots()

const {schemaFormProps, globalColProps, model, getModelValue, setModelValue, maxLabelWidth} = useSchemaFormContext()!


const formItemRef = ref<ComponentPublicInstance>()

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
  schema: schema as SchemaType,
  model: model.value,
  value: model.value[get(model.value, unref(field))],
  field: unref(field)
}))

const isHide = computed(() => callbackParamsFunction<boolean>(unref(hide)) ?? true)

const isRequired = computed(() => unref(required) || schemaFormProps.required)

// labelCol配置
const labelCol = computed<Col | undefined>(() => {
  if (labelWidth) return {style: {width: isNumber(labelWidth) ? `${unref(labelWidth)}px` : unref(labelWidth)}}
  if (schemaFormProps.autoLabelWidth) {
    return maxLabelWidth.value ? {style: {width: `${maxLabelWidth.value}px`}} : undefined
  }
  return undefined
})

watch(formItemRef, async () => {
  await nextTick();
  const scrollWidth = formItemRef.value?.$el.querySelector('.ant-form-item-label')?.scrollWidth
  if (scrollWidth > maxLabelWidth.value) maxLabelWidth.value = scrollWidth
});

const formItemRules = computed(() => {
  const ruleValue = unref(rule)
  if (!ruleValue) return
  // 处理规则预设
  if (typeof ruleValue === 'string') return handleRulePresets(ruleValue)
  return ruleValue
})

// formItem slots
const formItemSlots = computed(() => {
  const formItemSlots: Recordable = {}
  if (unref(label)) formItemSlots.label = () => callbackParamsFunction(unref(label))
  if (tooltipCustomRender) formItemSlots.tooltip = () => callbackParamsFunction(tooltipCustomRender)
  if (extra) formItemSlots.extra = () => callbackParamsFunction(extra)
  return formItemSlots
})

// 动态组件属性
const dynamicComponentAttribute = computed<any>(() => {
  // 常用的Props
  const commonProps: MapComponentCommonProps = {}
  // 全局默认Props
  const globalDefaultProps: Recordable = {}

  // 处理默认日期格式
  if (isDateComponent(component)) {
    globalDefaultProps.format = schemaFormProps.defaultDateFormat
    globalDefaultProps.valueFormat = schemaFormProps.defaultValueDateFormat
  }

  // 处理默认日期格式
  if (isTimeComponent(component)) {
    globalDefaultProps.format = schemaFormProps.defaultTimeFormat
    globalDefaultProps.valueFormat = schemaFormProps.defaultValueTimeFormat
  }

  // 处理自动生成Placeholder
  if (schemaFormProps.autoPlaceholder) commonProps.placeholder = generatePlaceholder(unref(label), component)

  // 映射选项列表
  if (unref(options) && isMapOptions(component)) commonProps.options = unref(options)

  // 映射占位符
  if (unref(placeholder) && isMapPlaceholder(component)) commonProps.placeholder = unref(placeholder)

  // 映射日期、日期格式
  if ((unref(format) || unref(valueFormat)) && (isDateComponent(component) || isTimeComponent(component))) {
    if (unref(format)) commonProps.format = unref(format)
    if (unref(valueFormat)) commonProps.valueFormat = unref(valueFormat)
  }

  // 禁用
  if (disabled !== undefined) commonProps.disabled = callbackParamsFunction(unref(disabled))

  return {
    ...globalDefaultProps,
    ...commonProps,
    // 声明ref会自动解包componentProps中的ref
    ...ref(componentProps).value as any
  }
})

// 动态组件插槽
const dynamicComponentSlots = computed(() => {
  // 组件默认插槽内容
  const defaultSlot = (slot: SchemaConfig['componentContent']) => ({default: () => slot})
  // TODO:默认上传暂时没思路
  // if (!componentContent) return component === 'Upload' ? defaultSlot(defaultUpload) : undefined
  if (!componentContent) return undefined

  const content = callbackParamsFunction(componentContent)

  if (isArray(content) || isString(content) || isVNode(content)) return defaultSlot(content)

  return content
})

// 执行回调函数并返回原值
const callbackParamsFunction = <T = never>(value: T | CallbackParamsFunction<any, any, T>) => isFunction(value)
    ? value(callbackParams.value)
    : value

const FormItem = () => {
  const DynamicComponent = SCHEMA_RENDER_COMPONENTS[component]

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
  // form item 组件的name属性不能接受 a.b.c 格式，只能将复杂的对象嵌套转成数组
  const arrayName = objectPathToArray(unref(field))
  const name = arrayName.length ? arrayName : undefined
  return (
      <a-form-item
          ref={formItemRef}
          colon
          rules={formItemRules.value}
          name={name}
          label-col={labelCol.value}
          tooltip={unref(tooltip)}
          required={isRequired.value}
          v-slots={formItemSlots.value}
      >
        {contentSlot ? slots.default?.() : renderComponent()}
      </a-form-item>
  )

}
</script>

<template>
  <a-col v-if="isHide" v-bind="{...{...globalColProps, ...unref(colProps)}}">
    <form-item v-if="!slot"></form-item>
    <slot v-else :name="slot"></slot>
  </a-col>
</template>

<style scoped lang="scss">
:deep(.ant-input-number) {
  width: 100%;
}

:deep(.ant-picker) {
  width: 100%;
}
</style>