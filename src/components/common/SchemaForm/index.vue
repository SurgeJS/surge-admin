<script setup lang="ts">
import { SchemaFormEmits,SchemaFormProps } from '@/components/common/SchemaForm/type/props'
import useOmitProps from '@/hooks/common/useOmitProps'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/utils/context'
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem.vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<SchemaFormProps>(),{
  required: false,
  autoPlaceholder: true,
  defaultDateFormat: 'YYYY-MM-DD',
  defaultTimeFormat: 'HH:mm:ss',
  defaultValueDateFormat: 'YYYY-MM-DD',
  defaultValueTimeFormat: 'HH:mm:ss'
})

const emits = defineEmits<SchemaFormEmits>()

// 提供Schema上下文
useProvideSchemaFormContext(props)

const aFormProps = useOmitProps(props,[
  'schema',
  'labelWidth',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultValueDateFormat',
  'defaultValueTimeFormat',
  'required',
  'autoPlaceholder'
])

// labelCol配置
const labelCol = computed(() => {
  return props.labelWidth ? { style: { width: `${ props.labelWidth }px` },...props.labelCol } : props.labelCol
})
</script>

<template>
  <a-form v-bind="aFormProps" :label-col="labelCol">
    <div class="schema-layout">
      <template
        v-for="config in props.schema"
        :key="config.field||config.slot"
      >
        <schema-form-item
          v-if="config.component||config.contentSlot"
          :schema-config="config"
        >
          <slot v-if="config.contentSlot" :name="config.contentSlot" />
        </schema-form-item>
        <slot v-if="config.slot" :name="config.slot" />
      </template>
    </div>
  </a-form>
</template>

<style scoped lang="scss">
.schema-layout {
  display: grid;
}
</style>
