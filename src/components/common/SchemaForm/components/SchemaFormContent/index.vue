<script setup lang="ts">
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem/index.vue'
import { SchemaFormContent } from '@/components/common/SchemaForm/components/SchemaFormContent/types/type'
import { useSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'

const { schema } = defineProps<SchemaFormContent>()
const { schemaFormProps } = useSchemaFormContext()!
</script>

<template>
  <grid v-bind="schemaFormProps.gridProps">
    <template
      v-for="config in schema"
      :key="config.field||config.slot"
    >
      <schema-form-item
        v-if="config.component||config.contentSlot||config.slot"
        ref="formItemsRef"
        :schema="config as any"
      >
        <slot v-if="config.contentSlot" :name="config.contentSlot" />
        <template v-if="config.slot" #[config.slot]="scope">
          <slot :name="config.slot" v-bind="scope||{}" />
        </template>
      </schema-form-item>
    </template>
    <slot />
  </grid>
</template>

<style scoped lang="scss">

</style>