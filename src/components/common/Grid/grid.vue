<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridProps } from '@/components/common/Grid/types'
import { useProvideGridContext } from '@/components/common/Grid/hooks/use-context.ts'
import { setItemVisible } from '@/components/common/Grid/utils'

const props = withDefaults(defineProps<GridProps>(), {
  cols: 24,
  collapsedRows: 1,
  responsive: 'screen'
})

const { rowEl,isOverflow,displayIndexList, itemDataList, responsiveCols, responsiveXGap, responsiveYGap } = useProvideGridContext(props)

const gridStyle = computed<CSSProperties>(() => ({
  'grid-template-columns': `repeat(${ responsiveCols.value }, minmax(0px, 1fr))`,
  gap: `${ responsiveXGap.value }px ${ responsiveYGap.value }px`
}))

watchEffect(() => {
  const itemVisible = setItemVisible(responsiveCols.value, props.collapsed, props.collapsedRows, itemDataList.value)
  isOverflow.value = itemVisible.overflow
  displayIndexList.value = itemVisible.displayIndexList
})
</script>

<template>
  <div
    ref="rowEl"
    class="grid"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
}
</style>