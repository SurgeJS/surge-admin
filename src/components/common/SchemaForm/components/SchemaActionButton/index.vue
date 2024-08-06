<script setup lang="ts">
import { SchemaFormContent } from '@/components/common/SchemaForm/components/SchemaFormContent/types/type'
import { SchemaFormCommonSlots } from '@/components/common/SchemaForm/types/type'

const props = withDefaults(defineProps<SchemaFormContent>(), {
  rowGutter: 12
})
defineSlots<SchemaFormCommonSlots>()
</script>

<template>
  <a-flex
    v-if="!props.hideActionButton"
    gap="10"
    justify="flex-end"
    align="center"
  >
    <slot name="beforeButton" />
    <slot name="customActionButton" />
    <slot name="afterButton" />
  </a-flex>
</template>

<style scoped lang="scss">

</style>