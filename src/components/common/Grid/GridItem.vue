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

const el = ref<HTMLElement>()
const parentElement = useParentElement()

// 当前元素在父元素中的index
const index = computed(() => {
  if (!parentElement.value) return -1
  return Array.from(parentElement.value.children).findIndex(item => {
    if (item === el.value) {
      // 获取元素的位置信息
      // 获取网格容器的样式信息
      // const gridStyles = window.getComputedStyle(parentElement.value)
      // const gridTemplateRows = gridStyles.gridTemplateRows.split(' ')
      // const rect = el.value.getBoundingClientRect()
      // const containerRect = parentElement.value.getBoundingClientRect()
      // const rowHeight = containerRect.height / gridTemplateRows.length
      // const rowIndex = Math.floor((rect.top - containerRect.top) / rowHeight) + 1
      // console.log(rowIndex)
      return true
    }
    return
  })
})

// 当前行数
const currentRow = computed(() => {
  const parent = parentElement.value
  const currentEl = el.value
  if (!parent || !currentEl) return
  const gridStyles = window.getComputedStyle(parent)
  const gridTemplateRows = gridStyles.gridTemplateRows.split(' ')
  const rect = currentEl.getBoundingClientRect()
  const containerRect = parent.getBoundingClientRect()
  const rowHeight = containerRect.height / gridTemplateRows.length
  return  Math.floor((rect.top - containerRect.top) / rowHeight) + 1
})

// 响应式 span
const responsiveSpan = computed(() => Number(isObject(props.span) ? getResponsiveValue(props.span) : props.span))

const gridColumnAttribute = computed(() => {
  const rSpan = responsiveSpan.value
  const rCols = responsiveCols.value
  return props.suffix ?
      `${ rCols - rSpan + 1 } / span ${ rSpan }` :
      `span ${ rSpan } / span ${ rSpan }`
})

const gridItemStyle = computed<CSSProperties>(() => ({
  'grid-column': gridColumnAttribute.value
}))

const isHide = computed(() => Number(props.span) === 0)

onMounted(() => {

})
</script>

<template>
  <div
    v-show="!isHide"
    ref="el"
    class="grid-item"
    :style="gridItemStyle"
  >
    <span>{{ currentRow }}</span>
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>