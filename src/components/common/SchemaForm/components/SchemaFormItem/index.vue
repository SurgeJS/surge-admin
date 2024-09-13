<script setup lang="tsx">
import {
  CallbackParams,
  CallbackParamsFunction,
  Schema,
  UnwrapRefSchema
} from '@/components/common/SchemaForm/types/type'
import { useSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import { computed, isVNode, useSlots } from 'vue'
import { SCHEMA_RENDER_COMPONENTS } from '@/components/common/SchemaForm/utils/components'
import {
  generateRule,
  handleRulePresets,
  isCheckedBind,
  isInputComponent,
  isPickComponent
} from '@/components/common/SchemaForm/utils'
import { get, isArray, isFunction, isNumber, isString, isUndefined, omitBy } from 'lodash-es'
import useOmitProps from '@/hooks/common/useOmitProps'
import { ColProps } from 'naive-ui'
import useRenderIcon from '@/hooks/components/useRenderIcon'

const schema = defineModel<UnwrapRefSchema>('schema', { required: true })

const slots = useSlots()
const { schemaFormProps, model, getModelValue, setModelValue } = useSchemaFormContext()!
const { RenderUnoIcon } = useRenderIcon()

// 回调参数
const callbackParams = computed(() => ({
  schema: schema.value,
  model: model.value,
  value: schema.value.field ? get(model.value, schema.value.field) : undefined,
  field: schema.value.field
}) as CallbackParams)

const isHide = computed(() => callbackParamsFunction<boolean | undefined>(schema.value.hide) ?? true)

const colPropsMap = computed(() => {
  const colP = schema.value.colProps || schemaFormProps.colProps
  return (isNumber(colP) ? { span: colP } : colP) as ColProps
})

// 执行回调函数并返回原值
const callbackParamsFunction = <T = never>(value: T | CallbackParamsFunction<any, any, T>) => isFunction(value)
    ? value(callbackParams.value)
    : value

const FormItem = defineComponent(() => {
  const formItemProps = useOmitProps(schema.value, [
    'field',
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

  // formItem rule
  const formItemRules = computed(() => {
    const rule = schema.value.rule
    if (!rule) {
      const isRequire = Boolean(schema.value.showRequireMark ?? schemaFormProps.showRequireMark)
      // 自动生成校验
      if (schemaFormProps.autoRules && isRequire && schema.value.component) {
        return generateRule(schema.value.label, schema.value.component)
      }
      return undefined
    }
    // 处理规则预设
    if (typeof rule === 'string') return handleRulePresets(rule)
    return rule
  })

  const DynamicComponent = computed(() => schema.value.component ? SCHEMA_RENDER_COMPONENTS[schema.value.component] : undefined)

  const bindValue = computed({
    get() {
      return getModelValue(schema.value.field as string)
    },
    set(value) {
      setModelValue(schema.value.field as string, value)
    }
  })

  // 动态组件属性
  const dynamicComponentAttribute = computed<Recordable>(() => {
    const component = schema.value.component
    if (!component) return {}

    const p: Recordable = {}
    // 处理默认日期格式
    if (component === 'datePicker') {
      p.format = schemaFormProps.defaultDateFormat
      p.valueFormat = schemaFormProps.defaultDateValueFormat
    }

    // 处理默认日期格式
    if (component === 'timePicker') {
      p.format = schemaFormProps.defaultTimeFormat
      p.valueFormat = schemaFormProps.defaultTimeValueFormat
    }

    // 处理自动生成Placeholder
    if (schemaFormProps.autoPlaceholder && isString(schema.value.label)) {
      const placeholderDefault = {
        daterange: [ '开始日期', '结束日期' ],
        datetimerange: [ '开始日期时间', '结束日期时间' ],
        yearrange: [ '开始年', '结束年' ],
        monthrange: [ '开始月', '结束月' ],
        quarterrange: [ '开始季度', '结束季度' ],
        input: `请输入${ schema.value.label }`,
        select: `请选择${ schema.value.label }`
      }
      const type = schema.value.componentProps?.type
      //  处理日期范围类型
      if (component === 'datePicker' && type.includes('range')) {
        p.startPlaceholder = placeholderDefault[type][0]
        p.endPlaceholder = placeholderDefault[type][1]
      } else if (isInputComponent(component)) {
        p.placeholder = placeholderDefault['input']
      } else if (isPickComponent(component)) {
        p.placeholder = placeholderDefault['select']
      }
    }

    return {
      ...p,
      ...schema.value.componentProps
    }
  })

  // 动态组件插槽
  const dynamicComponentSlots = computed(() => {
    const componentContent = schema.value.componentContent
    if (!componentContent) return undefined

    // 组件默认插槽内容
    const defaultSlot = (slot: Schema['componentContent']) => ({ default: () => slot })

    const content = callbackParamsFunction(componentContent)

    if (isArray(content) || isString(content) || isVNode(content)) return defaultSlot(content)

    return content
  })

  // 渲染动态组件
  const renderComponent = () => {
    const component = schema.value.component
    if (!component) return
    if (!DynamicComponent.value) return console.error(`未找到该组件：${ component }`)

    const bindType = schema.value?.vModelBind ? schema.value?.vModelBind : isCheckedBind(component) ? 'checked' : 'value'

    const modelBind = {
      [bindType]: bindValue.value,
      [`onUpdate:${ bindType }`]: v => bindValue.value = v,
    }

    return (
        <DynamicComponent.value
            v-slots={ dynamicComponentSlots.value }
            { ...modelBind }
            { ...dynamicComponentAttribute.value }>
        </DynamicComponent.value>
    )
  }

  const renderFormItemSlots = () => {
    // 处理默认插槽
    const defaultSlot = () => {
      return () => schema.value.contentSlot ? slots.default?.() : renderComponent()
    }
    // 处理label
    const labelSlot = () => {
      if (!schema.value.label) return
      const label = callbackParamsFunction(schema.value.label)
      return () => (<>
        { label }
        {
          schema.value.tooltip ?
              <n-tooltip>
                { {
                  default: () => schema.value.tooltip,
                  trigger: () => RenderUnoIcon('i-ic:outline-help', {
                    class: 'ml-5px'
                  })
                } }
              </n-tooltip>
              : undefined
        }
      </>)
    }

    return omitBy({
          default: defaultSlot(),
          label: labelSlot()
        },
        isUndefined
    )
  }
  return () => (
      <n-form-item
          key={ schema.value.label }
          rule={ formItemRules.value }
          path={ schema.value.field }
          { ...formItemProps.value }
          v-slots={ renderFormItemSlots() }
      />
  )
})
</script>

<template>
  <n-col v-if="isHide" v-bind="colPropsMap">
    <form-item v-if="!schema.slot" />
    <slot v-else :name="schema.slot" />
  </n-col>
</template>

<style scoped lang="scss">
:deep(.n-input-number), :deep(.n-time-picker) {
  width: 100%;
}

:deep(.n-form-item-label__text) {
  display: inline-flex;
  align-items: center;
  line-height: normal;
}
</style>