<script setup lang="ts">
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem/index.vue'
import { SchemaFormContent } from '@/components/common/SchemaForm/components/SchemaFormContent/types/type'

const { schema,gridProps,gridItemProps,disabled } = defineProps<SchemaFormContent>()
const id = useId()
</script>

<template>
  <grid v-bind="gridProps">
    <template
      v-for="config in schema"
      :key="config.field||config.slot"
    >
      <schema-form-item
        v-if="config.component||config.contentSlot||config.slot"
        :id="id"
        ref="formItemsRef"
        :grid-item-props="gridItemProps"
        :schema="config"
        :disabled="disabled"
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