<script setup lang="ts">
import { RowAlign, RowJustify, RowProps } from '@/components/common/Grid/types'
import { useProvideGridContext } from '@/components/common/Grid/hooks/useContext'
import { CSSProperties } from 'vue'
import useBreakpoint from '@/hooks/common/useBreakpoint.ts'

const { gutter = 0, responsive = 'screen', justify, align } = defineProps<RowProps>()
const el = useTemplateRef<HTMLElement>('el')
const { space } = useProvideGridContext(gutter)
const breakpoint = useBreakpoint()
const { width } = useElementSize(el)

const rowStyle = computed(() => {
  return {
    'justify-content': justify,
    'align-items': align,
    margin: `-${ space.value[1] / 2 }px -${ space.value[0] / 2 }px -${ space.value[1] / 2 }px -${ space.value[0] / 2 }px`
  } as CSSProperties
})

const handleResponsive = (value:RowAlign|RowJustify) => {

}
</script>

<template>
  <div
    ref="el"
    class="row"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  flex-flow: wrap;
}
</style>