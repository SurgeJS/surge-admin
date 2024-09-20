<script setup lang="ts">
import {
  SchemaFormExpose,
  SchemaFormProps,
  SchemaFormSlots,
  UnwrapRefSchema
} from '@/components/common/SchemaForm/types/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'

const props = withDefaults(defineProps<SchemaFormProps>(), {
  autoPlaceholder: true,
  autoRules: true,
  hideActionButton: false,
  labelWidth: 'auto',
  showLabel: true,
  showFeedback: true,
  showRequireMark: undefined,
  labelPlacement: 'top',
  submitText: '提交',
  resetText: '重置',
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  colProps: 24
})
const slots = defineSlots<SchemaFormSlots>()

// 表单模型
const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<UnwrapRefSchema[]>('schema', { required: true })
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
    <schema-form-content :schema="schema">
      <template v-for="(slot,key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope||{}" />
      </template>
      <n-col
        v-if="!props.hideActionButton"
        :span="24"
        class="flex-inline justify-end"
      >
        <div class="flex-inline  items-center gap-[12px] ">
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
        </div>
      </n-col>
    </schema-form-content>
  </schema-form-wrap>
</template>

<style scoped lang="scss">

</style>