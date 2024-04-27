<script setup lang="ts">
import { SchemaFormProps } from '@/components/common/SchemaForm/type/props'
import useOmitProps from '@/hooks/common/useOmitProps'
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem.vue'
import { useProvideSchemaForm } from '@/components/common/SchemaForm/utils/context'

const props = withDefaults(defineProps<SchemaFormProps>(),{
  defaultDateFormat: 'YYYY-MM-DD',
  defaultTimeFormat: 'HH:mm:ss',
  defaultValueDateFormat: 'YYYY-MM-DD',
  defaultValueTimeFormat: 'HH:mm:ss'
})

// 提供 Props
useProvideSchemaForm(props)

const aFormProps = useOmitProps(props,[
  'schema',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultValueDateFormat',
  'defaultValueTimeFormat',
  'required'
])
</script>

<template>
  <a-form v-bind="aFormProps">
    <template
      v-for="config in props.schema"
      :key="config.field||config.slot"
    >
      <schema-form-item
        v-if="config.component"
        :model="props.model"
        :schema-config="config"
      />
      <slot v-if="config.slot" :name="config.slot" />
    </template>
  </a-form>
</template>

<style scoped lang="scss">

</style>
