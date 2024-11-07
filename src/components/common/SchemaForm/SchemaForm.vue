<script setup lang="ts">
import { UnwrapRefSchema } from '@/components/common/SchemaForm/types/common.ts'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'
import { SchemaFormExpose, SchemaFormProps, SchemaFormSlots } from '@/components/common/SchemaForm/types/base.ts'

const props = withDefaults(defineProps<SchemaFormProps>(), {
  autoPlaceholder: true,
  autoRules: true,
  autoLabelWidth: true,
  autoScrollToFailField: true,
  hideActionButton: false,
  showLabel: true,
  showFeedback: true,
  showRequireMark: undefined,
  labelOverflowOmitted: false,
  labelPlacement: 'top',
  submitText: '提交',
  resetText: '重置',
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  gridProps: () => ({
    cols: 24,
    yGap: 12
  }),
  gridItemProps: 24
})
const slots = defineSlots<SchemaFormSlots>()

// 表单模型
const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<UnwrapRefSchema[]>('schema', { required: true })
console.log(props)
// 提供Schema上下文
useProvideSchemaFormContext(props, model)
const formProps = useOmitProps(props, [ 'schema' ])
const formContentSlots = useOmitProps(slots, [ 'customActionButton', 'buttonAfter', 'buttonBefore' ])
// 通用方法
const { formRef, commonExpose } = useExpose()
const { handleReset, handleSubmit } = useMethod(props, commonExpose, model)

defineExpose<SchemaFormExpose>(commonExpose)
</script>

<template>
  <schema-form-wrap
    ref="formRef"
    v-bind="formProps"
    :model="model"
  >
    <schema-form-content :schema="schema" :grid-props="gridProps">
      <template v-for="(slot,key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope||{}" />
      </template>
      <grid-item
        v-if="!props.hideActionButton"
        suffix
        :span="24"
        class="flex justify-end items-center gap-[12px] "
      >
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
        </slot>
        <slot name="buttonAfter" />
      </grid-item>
    </schema-form-content>
  </schema-form-wrap>
</template>

<style scoped lang="scss">

</style>