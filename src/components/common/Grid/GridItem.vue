<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GridItemProps } from '@/components/common/Grid/types'
import { useGridContext } from '@/components/common/Grid/hooks/useContext.ts'
import { isObject } from 'es-toolkit/compat'

const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1,
  suffix: false
})

const currentElement = useCurrentElement()
const { responsiveCols, getResponsiveValue, itemConfigList } = useGridContext()!

const responsiveSpan = computed(() => {
  return Number(isObject(props.span) ? getResponsiveValue(props.span) : props.span)
})

const gridColumn = computed(() => {
  const rSpan = responsiveSpan.value
  const rCols = responsiveCols.value
  return props.suffix ?
      `${ rCols - rSpan + 1 } / span ${ rSpan }` :
      `span ${ rSpan } / span ${ rSpan }`
})

const gridItemStyle = computed<CSSProperties>(() => {
  return {
    'grid-column': gridColumn.value
  }
})

const isHide = computed(() => Number(props.span) === 0)
// 根据 item class 给 itemConfigList 进行Push 
onMounted( async () => {
  await nextTick()
  console.dir(currentElement.value)
})
</script>

<template>
  <div
    v-show="!isHide"
    class="grid-item"
    :style="gridItemStyle"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>