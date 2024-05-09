<script setup lang="ts">
import { computed } from 'vue'
import { SCHEMA_RENDER_COMPONENTS } from '@/components/common/SchemaForm/utils/components'
import {
  CallbackParams,
  Col,
  ComponentSlots,
  MapComponentCommonProps,
  SchemaConfig
} from '@/components/common/SchemaForm/type/props'
import { useSchemaFormContext } from '@/components/common/SchemaForm/utils/context'
import {
  generatePlaceholder,
  handleRulePresets,
  isCheckComponent,
  isDateComponent,
  isMapOptions,
  isMapPlaceholder,
  isTimeComponent
} from '@/components/common/SchemaForm/utils'
import { isFunction,isNumber,isObject,isString } from 'lodash-es'

const props = defineProps<{ schemaConfig: SchemaConfig }>()

const { schemaConfig } = props

const { schemaFormProps } = useSchemaFormContext()!

// 回调参数
const callbackParams = computed<CallbackParams>(() => {
  return {
    schema: schemaConfig,
    model: schemaFormProps.model,
    value: schemaFormProps.model[schemaConfig.field!],
    field: schemaConfig.field!
  }
})

// labelCol配置
const labelCol = computed<Col | undefined>(() => schemaConfig.labelWidth ? {
  style: { width: isNumber(schemaConfig.labelWidth) ? `${ schemaConfig.labelWidth }px` : schemaConfig.labelWidth }
} : undefined)

// 处理Hide
const isHide = computed(() => isFunction(schemaConfig.hide)
                              ? schemaConfig.hide(callbackParams.value)
                              : schemaConfig.hide || true)

const DynamicComponent = computed(() => SCHEMA_RENDER_COMPONENTS[schemaConfig.component!])

// 组件的双向绑定字段
const bindValue = computed(() => schemaConfig.modelField || schemaConfig.field)

// 动态组件的属性
const attribute = computed<Recordable>(() => {
  // 常用的Props
  const commonProps: MapComponentCommonProps = {}
  // 全局默认Props
  const globalDefaultProps: Recordable = {}

  // 处理默认日期格式
  if (isDateComponent(schemaConfig.component!)) {
    globalDefaultProps.format = schemaFormProps.defaultDateFormat
    globalDefaultProps.valueFormat = schemaFormProps.defaultValueDateFormat
  }

  // 处理默认日期格式
  if (isTimeComponent(schemaConfig.component!)) {
    globalDefaultProps.format = schemaFormProps.defaultTimeFormat
    globalDefaultProps.valueFormat = schemaFormProps.defaultValueTimeFormat
  }

  // 处理自动生成Placeholder
  if (schemaFormProps.autoPlaceholder) commonProps.placeholder = generatePlaceholder(schemaConfig.label,schemaConfig.component!)

  // 映射选项列表
  if (schemaConfig.options && isMapOptions(schemaConfig.component!)) commonProps.options = schemaConfig.options

  // 映射占位符
  if (schemaConfig.placeholder && isMapPlaceholder(schemaConfig.component!)) commonProps.placeholder = schemaConfig.placeholder

  // 映射日期、日期格式
  if ((schemaConfig.format || schemaConfig.valueFormat) && (isDateComponent(schemaConfig.component!) || isTimeComponent(schemaConfig.component!))) {
    if (schemaConfig.format) commonProps.format = schemaConfig.format
    if (schemaConfig.valueFormat) commonProps.valueFormat = schemaConfig.valueFormat
  }

  return {
    ...globalDefaultProps,
    ...commonProps,
    ...schemaConfig.componentProps
  }
})

// 动态组件的插槽
const slots = computed<ComponentSlots | Recordable>(() => {
  if (!schemaConfig.componentContent) return {}
  let content = schemaConfig.componentContent

  if (isFunction(schemaConfig.componentContent)) content = schemaConfig.componentContent(callbackParams.value)

  return isObject(content) ? content : {
    default: () => content
  }
})

// 获取规则
const rules = computed(() => {
  if (!schemaConfig.rule) return
  // 处理规则预设
  if (typeof schemaConfig.rule === 'string') return handleRulePresets(schemaConfig.rule)
  return schemaConfig.rule
})

// formItem 插槽
const formItemSlots = computed<Recordable>(() => ({
  // 标签
  label: () => isFunction(schemaConfig.label) ? schemaConfig.label(callbackParams.value) : schemaConfig.label,
  // 工具提示
  tooltip: schemaConfig.helpCustomRender ? () => schemaConfig.helpCustomRender : undefined,
  // 额外
  extra: () => schemaConfig.extra
}))
</script>

<template>
  <a-form-item
    v-show="isHide"
    :rules="rules"
    :required=" schemaConfig.required || schemaFormProps.required"
    :name="schemaConfig.field"
    :label-col="labelCol as any"
    colon
    :tooltip="schemaConfig.helpMessage"
  >
    <template
      v-for="(value,key) in formItemSlots"
      :key="key"
      #[key]="slotProps"
    >
      <template v-if="value&&isString(value(slotProps))">{{ value(slotProps) }}</template>
      <component :is="value&&value(slotProps)" v-else />
    </template>
    <dynamic-component
      v-if="isCheckComponent(schemaConfig.component!)"
      v-model:checked="schemaFormProps.model[bindValue!]"
      v-bind="attribute"
    >
      <template
        v-for="(value,key) in slots"
        :key="key"
        #[key]="slotProps"
      >
        <template v-if="isString(value(slotProps))">{{ value(slotProps) }}</template>
        <component :is="value(slotProps)" v-else />
      </template>
    </dynamic-component>
    <dynamic-component
      v-else
      v-model:value="schemaFormProps.model[bindValue!]"
      v-bind="attribute"
    >
      <template
        v-for="(value,key) in slots"
        :key="key"
        #[key]="slotProps"
      >
        <component :is="value(slotProps)" />
      </template>
    </dynamic-component>
  </a-form-item>
</template>

<style lang="scss">

</style>
