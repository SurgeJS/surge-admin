<script setup lang="ts">
import { computed } from 'vue'
import { isNumber } from 'lodash-es'
import { SchemaFormCommonProps } from '@/components/common/SchemaForm/types/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import { FormExpose } from 'ant-design-vue/es/form/Form'
import useCommonExpose from '@/components/common/SchemaForm/hooks/useCommonExpose'

const props = defineProps<SchemaFormCommonProps>()

const aFormProps = useOmitProps(props,[
  'formClass',
  'formStyle',
  'model',
  'visible',
  'required',
  'labelCol',
  'labelWidth',
  'colProps',
  'rowProps',
  'submitLoading',
  'hideActionButton',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultValueDateFormat',
  'defaultValueTimeFormat',
  'autoPlaceholder',
])

const { formRef,commonExpose } = useCommonExpose()

// labelCol配置
const labelCol = computed(() => {
  if (!props.labelWidth) return props.labelCol
  return {
    style: {
      width: isNumber(props.labelWidth)
          ? `${ props.labelWidth }px`
          : props.labelWidth
    }, ...props.labelCol
  }
})

defineExpose<FormExpose>(commonExpose)
</script>

<template>
  <a-form
    ref="formRef"
    :class="formClass"
    :style="props.formStyle"
    v-bind="aFormProps"
    :model="model"
    :label-col="labelCol"
  >
    <slot />
  </a-form>
</template>

<style scoped lang="scss">

</style>