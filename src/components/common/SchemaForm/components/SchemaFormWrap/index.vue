<script setup lang="ts">
import { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/components/common/SchemaForm/types/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import { FormInst } from 'naive-ui'
import { useSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import { cloneDeep } from 'lodash-es'

const props = defineProps<SchemaFormCommonProps>()
const { model } = useSchemaFormContext()!

const nFormProps = useOmitProps(props, [
  'formClass',
  'formStyle',
  'model',
  'colProps',
  'rowProps',
  'hideActionButton',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultDateValueFormat',
  'defaultTimeValueFormat',
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

const commonExpose: SchemaFormCommonExpose = {} as SchemaFormCommonExpose
const initModel = cloneDeep(model.value)
const formRef = ref<FormInst>()

const setExpose = () => {
  if (!formRef.value) return
  commonExpose['validate'] = formRef.value.validate
  commonExpose['restoreValidation'] = formRef.value.restoreValidation

  commonExpose['resetFields'] = () => {
    model.value = cloneDeep(initModel)
    commonExpose.restoreValidation()
  }
}

onMounted(() => {
  setExpose()
})

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