<script setup lang="tsx">
import {
  CallbackParams,
  CallbackParamsFunction,
  Col,
  MapComponentCommonProps,
  SchemaConfig,
  SchemaType
} from '@/components/common/SchemaForm/type/props'
import { useSchemaFormContext } from '@/components/common/SchemaForm/utils/context'
import { computed,isVNode,ref,unref,useSlots } from 'vue'
import { SCHEMA_RENDER_COMPONENTS } from '@/components/common/SchemaForm/utils/components'
import {
  generatePlaceholder,
  handleRulePresets,
  isCheckComponent,
  isDateComponent,
  isMapOptions,
  isMapPlaceholder,
  isTimeComponent
} from '@/components/common/SchemaForm/utils'
import { get,isArray,isFunction,isNumber,isString,set } from 'lodash-es'

const { schema } = defineProps<{ schema: Required<SchemaConfig> }>()

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

const { schemaFormProps,globalColProps } = useSchemaFormContext()!

// 双向绑定
const bindValue = computed({
  get() {
    return get(schemaFormProps.model,unref(field))
  },
  set(newValue) {
    set(schemaFormProps.model,unref(field),newValue)
  }
})

// 回调参数
const callbackParams = computed<CallbackParams>(() => ({
  schema: schema as SchemaType,
  model: schemaFormProps.model,
  value: schemaFormProps.model[unref(field)],
  field: unref(field)
}))

const isHide = computed(() => callbackParamsFunction<boolean>(unref(hide)) ?? true)

const isRequired = computed(() => unref(required) || schemaFormProps.required)

// labelCol配置
const labelCol = computed<Col | undefined>(() => {
  const width = unref(labelWidth)
  return width ? { style: { width: isNumber(width) ? `${ width }px` : width } } : undefined
})

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
  if (isDateComponent(unref(component))) {
    globalDefaultProps.format = schemaFormProps.defaultDateFormat
    globalDefaultProps.valueFormat = schemaFormProps.defaultValueDateFormat
  }

  // 处理默认日期格式
  if (isTimeComponent(unref(component))) {
    globalDefaultProps.format = schemaFormProps.defaultTimeFormat
    globalDefaultProps.valueFormat = schemaFormProps.defaultValueTimeFormat
  }

  // 处理自动生成Placeholder
  if (schemaFormProps.autoPlaceholder) commonProps.placeholder = generatePlaceholder(unref(label),unref(component))

  // 映射选项列表
  if (unref(options) && isMapOptions(unref(component))) commonProps.options = unref(options)

  // 映射占位符
  if (unref(placeholder) && isMapPlaceholder(unref(component))) commonProps.placeholder = unref(placeholder)

  // 映射日期、日期格式
  if ((unref(format) || unref(valueFormat)) && (isDateComponent(unref(component)) || isTimeComponent(unref(component)))) {
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
  const defaultSlot = (slot: SchemaConfig['componentContent']) => ({ default: () => slot })

  // if (!componentContent) return component === 'Upload' ? defaultSlot(defaultUpload) : undefined
  if (!componentContent) return undefined

  const content = callbackParamsFunction(componentContent)

  if (isArray(content) || isString(content) || isVNode(content)) return defaultSlot(content)

  return content
})

// 执行回调函数并返回原值
const callbackParamsFunction = <T = never>(value: T | CallbackParamsFunction<any,any,T>) => isFunction(value)
                                                                                            ? value(callbackParams.value)
                                                                                            : value

const FormItem = () => {
  const DynamicComponent = SCHEMA_RENDER_COMPONENTS[unref(component)]

  const renderComponent = () => {
    return isCheckComponent(unref(component)) ?
           (
               <DynamicComponent
                   v-model:checked={ bindValue.value }
                   v-slots={ dynamicComponentSlots.value }
                   { ...dynamicComponentAttribute.value }>
               </DynamicComponent>
           ) :
           (
               <DynamicComponent
                   v-model:value={ bindValue.value }
                   v-slots={ dynamicComponentSlots.value }
                   { ...dynamicComponentAttribute.value }>
               </DynamicComponent>
           )
  }

  return (
      <a-form-item
          colon
          rules={ formItemRules.value }
          name={ unref(field) }
          label-col={ labelCol.value }
          tooltip={ unref(tooltip) }
          required={ isRequired.value }
          v-slots={ formItemSlots.value }
      >
        { contentSlot ? slots.default?.() : renderComponent() }
      </a-form-item>
  )

}
</script>

<template>
  <a-col v-if="isHide" v-bind="{...{...globalColProps, ...unref(colProps)}}">
    <form-item v-if="!slot"></form-item>
    <slot v-else :name="slot"></slot>
    <!--    <form-item>
          <RenderDynamicComponent></RenderDynamicComponent>
          &lt;!&ndash;      <dynamic-component&ndash;&gt;
          &lt;!&ndash;          v-if="isCheckComponent(component)"&ndash;&gt;
          &lt;!&ndash;          v-bind="dynamicComponentAttribute"&ndash;&gt;
          &lt;!&ndash;          v-model:checked="bindValue"&ndash;&gt;
          &lt;!&ndash;      >&ndash;&gt;
          &lt;!&ndash;        <template&ndash;&gt;
          &lt;!&ndash;            v-for="(item,key) in dynamicComponentSlots"&ndash;&gt;
          &lt;!&ndash;            :key="key"&ndash;&gt;
          &lt;!&ndash;            #[key]="params"&ndash;&gt;
          &lt;!&ndash;        >&ndash;&gt;
          &lt;!&ndash;          <component :is="item(params)" />&ndash;&gt;
          &lt;!&ndash;        </template>&ndash;&gt;
          &lt;!&ndash;      </dynamic-component>&ndash;&gt;
          &lt;!&ndash;      <dynamic-component&ndash;&gt;
          &lt;!&ndash;          v-else&ndash;&gt;
          &lt;!&ndash;          v-model:value="bindValue"&ndash;&gt;
          &lt;!&ndash;          v-bind="dynamicComponentAttribute"&ndash;&gt;
          &lt;!&ndash;      >&ndash;&gt;
          &lt;!&ndash;        <template v-for="(item,key) in dynamicComponentSlots" #[key]="params">&ndash;&gt;
          &lt;!&ndash;          <component :is="item(params)" />&ndash;&gt;
          &lt;!&ndash;        </template>&ndash;&gt;
          &lt;!&ndash;      </dynamic-component>&ndash;&gt;
        </form-item>-->
  </a-col>
</template>

<style scoped lang="scss">

</style>