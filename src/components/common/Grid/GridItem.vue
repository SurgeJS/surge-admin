<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridItemProps } from '@/components/common/Grid/types'

const { span = 1 } = defineProps<GridItemProps>()
const gridItemStyle = computed<CSSProperties>(() => {
  return {
    gridColumn: `span ${ span }`
  }
})
</script>

<template>
  <div class="grid-item" :style="gridItemStyle"><slot /></div>
</template>

<style scoped lang="scss">

</style>