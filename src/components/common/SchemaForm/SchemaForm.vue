<script setup lang="ts">
import { SchemaFormExpose, SchemaFormProps, SchemaFormSlots } from '@/components/common/SchemaForm/types/type'
import initialProps from '@/components/common/SchemaForm/utils/initialProps'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'

const props = withDefaults(defineProps<SchemaFormProps>(), {
  ...initialProps,
  colProps:24
})
const slots = defineSlots<SchemaFormSlots>()

// 表单模型
const model = defineModel<Recordable>('model', { required: true })
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
      <a-col
        v-if="!props.hideActionButton"
        :span="24"
        class="flex-inline justify-end items-center gap-[12px] "
      >
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
        </slot>
        <slot name="buttonAfter" />
      </a-col>
    </schema-form-content>
  </schema-form-wrap>
</template>

<style scoped lang="scss">

</style>