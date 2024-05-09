<script lang="tsx">
import { defineComponent,PropType } from 'vue'
import { CallbackParams,Col,MapComponentCommonProps,SchemaConfig } from '@/components/common/SchemaForm/type/props'
import { SCHEMA_RENDER_COMPONENTS } from '@/components/common/SchemaForm/utils/components'
import { isFunction,isNumber,isObject } from 'lodash-es'
import {
  generatePlaceholder,
  handleRulePresets,
  isCheckComponent,
  isDateComponent,
  isMapOptions,
  isMapPlaceholder,
  isTimeComponent
} from '@/components/common/SchemaForm/utils'
import { useSchemaFormContext } from '@/components/common/SchemaForm/utils/context'

export default defineComponent((props) => {
    const { schemaConfig } = props
    const {
      label,
      component,
      field,
      modelField,
      componentContent,
      componentProps,
      options,
      rule,
      placeholder,
      format,
      valueFormat,
      required,
      hide,
      helpMessage,
      helpCustomRender,
      labelWidth,
      extra
    } = schemaConfig
    const { schemaFormProps } = useSchemaFormContext()!

    // labelCol配置
    const labelCol: Col | undefined = labelWidth ? {
      style: { width: isNumber(labelWidth) ? `${ labelWidth }px` : labelWidth }
    } : undefined

    // 回调参数
    const callbackParams: CallbackParams = {
      schema: schemaConfig,
      model: schemaFormProps.model,
      value: schemaFormProps.model[field!],
      field: field!
    }

    // 处理Hide
    const isHide = isFunction(hide) ? hide(callbackParams) : hide || true

    // 获取规则
    const getRules = () => {
      if (!rule) return
      // 处理规则预设
      if (typeof rule === 'string') return handleRulePresets(rule)
      return rule
    }

    // 渲染组件
    const renderComponent = () => {
      if (!component || !field) return undefined

      // 动态组件
      const DynamicComponent = SCHEMA_RENDER_COMPONENTS[component]

      // 组件的双向绑定字段
      const bindValue = modelField || field

      // 获取组件属性
      const getComponentAttribute = (): Recordable => {
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
        if (schemaFormProps.autoPlaceholder) commonProps.placeholder = generatePlaceholder(label,component)

        // 映射选项列表
        if (options && isMapOptions(component)) commonProps.options = options

        // 映射占位符
        if (placeholder && isMapPlaceholder(component)) commonProps.placeholder = placeholder

        // 映射日期、日期格式
        if ((format || valueFormat) && (isDateComponent(component) || isTimeComponent(component))) {
          if (format) commonProps.format = format
          if (valueFormat) commonProps.valueFormat = valueFormat
        }

        return {
          ...globalDefaultProps,
          ...commonProps,
          ...componentProps
        }
      }

      // 获取组件插槽
      const getComponentSlot = () => {
        if (!componentContent) return undefined
        let content = componentContent

        if (isFunction(componentContent)) content = componentContent(callbackParams)

        return isObject(content) ? content : {
          default: () => content
        }
      }

      // 是否是checked类型的组件
      return isCheckComponent(component) ?
             (
               <DynamicComponent
                 v-model:checked={ schemaFormProps.model[bindValue] }
                 v-slots={ getComponentSlot() }
                 { ...getComponentAttribute() }>
               </DynamicComponent>
             ) :
             (
               <DynamicComponent
                 v-model:value={ schemaFormProps.model[bindValue] }
                 v-slots={ getComponentSlot() }
                 { ...getComponentAttribute() }>
               </DynamicComponent>
             )
    }

    // formItem slots
    const formItemSlots = {
      // 标签
      label: () => isFunction(schemaConfig.label) ? schemaConfig.label(callbackParams) : schemaConfig.label,
      // 工具提示
      tooltip: helpCustomRender ? () => helpCustomRender : undefined,
      // 额外
      extra: () => extra
    }

    return () => (
      <a-form-item
        v-show={ isHide }
        rules={ getRules() }
        required={ required || schemaFormProps.required }
        name={ schemaConfig.field }
        label-col={ labelCol }
        colon
        tooltip={ helpMessage }
        v-slots={ formItemSlots }
      >
        { renderComponent() }
      </a-form-item>
    )
  },
  {
    props: {
      schemaConfig: {
        type: Object as PropType<SchemaConfig>,
        required: true
      }
    }
  })
</script>

