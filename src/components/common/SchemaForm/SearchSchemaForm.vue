<script setup lang="ts">
import {
  SearchSchemaFormExpose,
  SearchSchemaFormProps,
  SearchSchemaFormSlots,
  UnwrapRefSchema
} from '@/components/common/SchemaForm/types/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'
import { take } from 'es-toolkit'

const props = withDefaults(defineProps<SearchSchemaFormProps>(), {
  autoPlaceholder: true,
  autoRules: true,
  hideActionButton: false,
  labelWidth: 'auto',
  showLabel: true,
  showFeedback: true,
  showRequireMark: undefined,
  labelPlacement: 'top',
  submitText: '搜索',
  resetText: '重置',
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  gridItemProps: 24,
  searchShowNumber: 3,
})
const slots = defineSlots<SearchSchemaFormSlots>()

// 表单模型
const model = defineModel<Recordable>('model', { required: true })
// 提供Schema上下文
useProvideSchemaFormContext(props, model)
const formProps = useOmitProps(props, [ 'searchShowNumber', 'schema' ])
const formContentSlots = useOmitProps(slots, [ 'customActionButton', 'buttonAfter', 'buttonBefore' ])

// 通用方法
const { formRef, commonExpose } = useExpose()
const { handleReset, handleSubmit } = useMethod(props, commonExpose, model)

// 是否展开搜索表单
const [ isExpandSearchForm, setExpandSearchForm ] = useToggle()

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

defineExpose<SearchSchemaFormExpose>(commonExpose)
</script>

<template>
  <schema-form-wrap
    ref="formRef"
    v-bind="formProps"
    :model="model"
  >
    <schema-form-content :schema="searchSchemas as UnwrapRefSchema[]">
      <template v-for="(slot,key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope||{}" />
      </template>
      <grid-item v-if="!props.hideActionButton" suffix>
        <slot name="buttonBefore" />
        <slot name="customActionButton">
          <n-button
            v-if="!hideReset"
            :loading="props.resetLoading"
            @click="handleReset"
          >
            {{ props.resetText }}
          </n-button>
          <n-button
            type="primary"
            :loading="props.submitLoading"
            @click="handleSubmit"
          >
            {{ props.submitText }}
          </n-button>
          <n-button
            v-if="props.searchShowNumber"
            @click="setExpandSearchForm()"
          >
            {{ searchExpandCollapse.text }}
            <icon :icon="searchExpandCollapse.icon" />
          </n-button>
        </slot>
        <slot name="buttonAfter" />
      </grid-item>
    </schema-form-content>
  </schema-form-wrap>
</template>

<style scoped lang="scss">
:deep(.ant-form-item) {
  margin-bottom: 0;
}
</style>