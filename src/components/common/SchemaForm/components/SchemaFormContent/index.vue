<script setup lang="ts">
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem/index.vue'
import { SchemaFormContent } from '@/components/common/SchemaForm/components/SchemaFormContent/types/type'

withDefaults(defineProps<SchemaFormContent>(), {
  rowGutter: 12
})
</script>

<template>
  <a-row class="w-full" :gutter="rowGutter">
    <template
      v-for="config in schema "
      :key="config.field||config.slot"
    >
      <schema-form-item
        v-if="config.component||config.contentSlot||config.slot"
        ref="formItemsRef"
        :schema="config as any"
      >
        <slot v-if="config.contentSlot" :name="config.contentSlot" />
        <template v-if="config.slot" #[config.slot]>
          <slot :name="config.slot" />
        </template>
      </schema-form-item>
    </template>
    <slot />
  </a-row>
</template>

<style scoped lang="scss">

</style>