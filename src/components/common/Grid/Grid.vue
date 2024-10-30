<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridProps } from '@/components/common/Grid/types'
import { isNumber } from 'es-toolkit/compat'
import { useProvideGridContext } from '@/components/common/Grid/hooks/useContext.ts'

const props = withDefaults(defineProps<GridProps>(), {
  cols: 24,
  itemMinWidth: '0px',
  itemMaxWidth: '1fr',
  responsive:'screen'
})

const { rowEl,responsiveCols } = useProvideGridContext(props)

const gridStyle = computed<CSSProperties>(() => {
  return {
    'grid-template-columns': `repeat(${ responsiveCols.value }, minmax(${ handleStrOrNum(props.itemMinWidth) }, ${ handleStrOrNum(props.itemMaxWidth) }))`,
    gap: `${ handleStrOrNum(props.xGap) } ${ handleStrOrNum(props.yGap) }`
  }
})

const handleStrOrNum = (value: string | number | undefined) => {
  return isNumber(value) ? `${ value }px` : value
}

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