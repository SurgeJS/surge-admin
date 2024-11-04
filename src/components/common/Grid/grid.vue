<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridProps } from '@/components/common/Grid/types'
import { useProvideGridContext } from '@/components/common/Grid/hooks/use-context.ts'

const props = withDefaults(defineProps<GridProps>(), {
  cols: 24,
  responsive: 'screen'
})

const { rowEl,itemDataMap,itemDataList, responsiveCols, responsiveXGap, responsiveYGap } = useProvideGridContext(props)

const gridStyle = computed<CSSProperties>(() => ({
  'grid-template-columns': `repeat(${ responsiveCols.value }, minmax(0px, 1fr))`,
  gap: `${ responsiveXGap.value }px ${ responsiveYGap.value }px`
}))

const toggleCollapsed = (isCollapsed?: boolean) => {
  console.log(isCollapsed)
}

onMounted(() => {
  console.log(itemDataMap)
  setTimeout(() => {
    console.log(itemDataList.value)
  },2000)
  toggleCollapsed()
})

watch(() => props.collapsed, () => {
  toggleCollapsed(props.collapsed)
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