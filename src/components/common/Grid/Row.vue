<script setup lang="ts">
import { CSSProperties } from 'vue'
import { isArray } from 'lodash-es'
import { RowProps } from '@/components/common/Grid/types'

const { gutter } = defineProps<RowProps>()

const rowStyle = computed<CSSProperties>(() => {
  return {
    gap: isArray(gutter) ? `${ gutter[0] }px ${ gutter[1] }px` : `${ gutter }px`
  }
})
</script>

<template>
  <div class="row" :style="rowStyle">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  flex-flow: wrap;
}
</style>