<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridItemProps } from '@/components/common/Grid/types'
import { useGridContext } from '@/components/common/Grid/hooks/useContext.ts'
import { isObject } from 'es-toolkit/compat'

const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1,
  suffix: false
})

const { responsiveCols, getResponsiveValue } = useGridContext()!

const responsiveSpan = computed(() => {
  return Number(isObject(props.span) ? getResponsiveValue(props.span) : props.span)
})

const gridColumn = computed(() => {
  return props.suffix ?
      `${ Number(responsiveCols.value) - responsiveSpan.value + 1 } / span ${ responsiveSpan.value }` :
      `span ${ responsiveSpan.value } / span ${ responsiveSpan.value }`
})

const gridItemStyle = computed<CSSProperties>(() => {
  return {
    'grid-column': gridColumn.value
  }
})

const isHide = computed(() => Number(props.span) === 0)
</script>

<template>
  <div v-show="!isHide" :style="gridItemStyle">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>