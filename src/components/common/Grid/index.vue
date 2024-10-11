<script setup lang="ts">
import { GridProps } from '@/components/common/Grid/types'
import { CSSProperties } from 'vue'
import { isArray } from 'lodash-es'

const { cols = 24, gap = 12 } = defineProps<GridProps>()

const gridStyle = computed<CSSProperties>(() => {
  return {
    gridTemplateColumns: `repeat(${ cols },minmax(0px, 1fr))`,
    gap: isArray(gap) ? `${ gap[0] }px ${ gap[1] }px` : `${ gap }px`
  }
})
</script>

<template>
  <div class="grid" :style="gridStyle">
    <slot />
  </div>
</template> 

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>