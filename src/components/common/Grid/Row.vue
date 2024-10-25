<script setup lang="ts">
import { RowProps } from '@/components/common/Grid/types'
import { useProvideGridContext } from '@/components/common/Grid/hooks/useContext'
import { CSSProperties } from 'vue'
import useBreakpoint from '@/hooks/common/useBreakpoint.ts'
import { isString } from 'es-toolkit'

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

const handleResponsive = (value: RowProps['align'] | RowProps['justify']) => {
  if (isString(value)) return value

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