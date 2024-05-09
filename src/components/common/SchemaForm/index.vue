<script setup lang="ts">
import { SchemaFormProps } from '@/components/common/SchemaForm/type/props'
import useOmitProps from '@/hooks/common/useOmitProps'
import { useProvideSchemaForm } from '@/components/common/SchemaForm/utils/context'
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem.vue'
import { computed,ref } from 'vue'
import { isNumber } from 'lodash-es'

const props = withDefaults(defineProps<SchemaFormProps>(),{
  required: false,
  autoPlaceholder: true,
  autoLabelWidth: true,
  defaultDateFormat: 'YYYY-MM-DD',
  defaultTimeFormat: 'HH:mm:ss',
  defaultValueDateFormat: 'YYYY-MM-DD',
  defaultValueTimeFormat: 'HH:mm:ss'
})

// 提供 Props
useProvideSchemaForm(props)

const aFormProps = useOmitProps(props,[
  'schema',
  'labelWidth',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultValueDateFormat',
  'defaultValueTimeFormat',
  'required',
  'autoPlaceholder',
  'autoLabelWidth'
])

const formItemRefs = ref<InstanceType<typeof SchemaFormItem>[]>()

// 标签最大宽度
const labelMaxWidth = computed(() => {
  return formItemRefs.value?.reduce((maxWidth,item) => {
    const label = item.$el.querySelector('label')
    if (label && label.clientWidth > maxWidth) return label.clientWidth
    return maxWidth
  },0)
})

// labelCol配置
const labelColConfig = computed(() => {
  const labelStyle: Recordable = {}
  // 自动设置标签宽度
  if (props.autoLabelWidth) {
    labelStyle.width = `${ labelMaxWidth.value }px`
  } else if (props.labelWidth) {
    labelStyle.width = isNumber(props.labelWidth) ? `${ props.labelWidth }px` : props.labelWidth
  }
  return { style: labelStyle,...props.labelCol }
})


</script>

<template>
  <a-form v-bind="aFormProps" :label-col="labelColConfig">
    <template
      v-for="config in props.schema"
      :key="config.field||config.slot"
    >
      <schema-form-item
        v-if="config.component"
        ref="formItemRefs"
        :schema-config="config"
      />
      <slot v-if="config.slot" :name="config.slot" />
    </template>
  </a-form>
</template>

<style scoped lang="scss">

</style>
