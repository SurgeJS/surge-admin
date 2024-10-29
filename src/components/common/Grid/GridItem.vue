<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridItemProps } from '@/components/common/Grid/types'
import { useGridContext } from '@/components/common/Grid/hooks/useContext.ts'

const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1,
  suffix:false
})

const { props: gridProps } = useGridContext()!

const gridColumn = computed(() => {
  return props.suffix ?
      `${ Number(gridProps.cols) - Number(props.span) + 1 } / span ${Number(props.span)}` :
      `span ${ props.span } / span ${ props.span }`
})

const gridItemStyle = computed<CSSProperties>(() => {
  return {
    'grid-column':gridColumn.value,
  }
})

const isHide = computed(()=>Number(props.span) === 0)
</script>

<template>
  <div v-show="!isHide" :style="gridItemStyle">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>