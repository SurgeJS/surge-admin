<script setup lang="ts">
import { CSSProperties } from 'vue'
import { isArray } from 'lodash-es'
import { RowProps } from '@/components/common/Grid/types'

const { gap } = defineProps<RowProps>()

const rowStyle = computed<CSSProperties>(() => {
  return {
    // gridTemplateColumns: `repeat(${ cols },minmax(0px, 1fr))`,
    gap: isArray(gap) ? `${ gap[0] }px ${ gap[1] }px` : `${ gap }px`
  }
})
</script>

<template>
  <div :style="rowStyle">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>