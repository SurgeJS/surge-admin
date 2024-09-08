<script setup lang="ts">
import { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/components/common/SchemaForm/types/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'

const props = defineProps<SchemaFormCommonProps>()

const nFormProps = useOmitProps(props, [
  'formClass',
  'formStyle',
  'model',
  'colProps',
  'rowProps',
  'hideActionButton',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultValueDateFormat',
  'defaultValueTimeFormat',
  'autoPlaceholder',
  'autoRules',
  'submitLoading',
  'submitText',
  'resetLoading',
  'resetText',
  'hideReset',
  'onSubmit',
  'onFinish',
  'onFinishFailed',
  'onReset',
])

const { formRef, commonExpose } = useExpose()

defineExpose<SchemaFormCommonExpose>(commonExpose)
</script>

<template>
  <n-form
    ref="formRef"
    :class="formClass"
    :style="props.formStyle"
    v-bind="nFormProps"
    :model="model"
  >
    <slot />
  </n-form>
</template>

<style scoped lang="scss">

</style>