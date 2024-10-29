<script setup lang="ts">
import { RowProps } from '@/components/common/Grid/types'
import { useProvideGridContext } from '@/components/common/Grid/hooks/useContext'
import { CSSProperties } from 'vue'
import { isString } from 'es-toolkit'

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  responsive: 'screen'
})

const { space, rowEl, getBreakpointRecodValue } = useProvideGridContext(props)
const rowStyle = computed(() => {
  return {
    'justify-content': handleResponsive(props.justify),
    'align-items': handleResponsive(props.align),
    margin: `-${ space.value[1] / 2 }px -${ space.value[0] / 2 }px -${ space.value[1] / 2 }px -${ space.value[0] / 2 }px`
  } as CSSProperties
})

const handleResponsive = (value: RowProps['align'] | RowProps['justify']) => {
  if (!value) return
  if (isString(value)) return value
  return getBreakpointRecodValue(value)
}
</script>

<template>
  <div
    ref="rowEl"
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