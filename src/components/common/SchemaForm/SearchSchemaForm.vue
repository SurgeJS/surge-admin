<script setup lang="ts">
import {
  SearchSchemaFormExpose,
  SearchSchemaFormProps,
  SearchSchemaFormSlots
} from '@/components/common/SchemaForm/types/type'
import initialProps from '@/components/common/SchemaForm/utils/initialProps'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { take } from 'lodash-es'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'

const props = withDefaults(defineProps<SearchSchemaFormProps>(), {
  ...initialProps,
  searchShowNumber: 3,
  submitText: '查询',
  colProps: () => ({
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 6
  })
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
    <schema-form-content :row-gutter="[12,12]" :schema="searchSchemas">
      <template v-for="(slot,key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope||{}" />
      </template>
      <a-col v-if="!props.hideActionButton" class="flex-auto flex-inline justify-end items-center gap-[12px]">
        <slot name="buttonBefore" />
        <slot name="customActionButton">
          <a-button
            v-if="!hideReset"
            :loading="props.resetLoading"
            @click="handleReset"
          >
            {{ props.resetText }}
          </a-button>
          <a-button
            type="primary"
            :loading="props.submitLoading"
            @click="handleSubmit"
          >
            {{ props.submitText }}
          </a-button>
          <a-button
            v-if="props.searchShowNumber"
            type="link"
            @click="setExpandSearchForm()"
          >
            {{ searchExpandCollapse.text }}
            <icon :icon="searchExpandCollapse.icon" />
          </a-button>
        </slot>
        <slot name="buttonAfter" />
      </a-col>
    </schema-form-content>
  </schema-form-wrap>
</template>

<style scoped lang="scss">
:deep(.ant-form-item) {
  margin-bottom: 0;
}
</style>