<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridProps } from '@/components/common/Grid/types'

const props = withDefaults(defineProps<GridProps>(), {
  cols: 24
})

const gridStyle = computed<CSSProperties>(() => {
  return {
    'grid-template-columns': `repeat(${props.cols}, minmax(200px, 1fr))`,
    gap: `${ props.xGap } ${ props.yGap }`
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
}
</style>