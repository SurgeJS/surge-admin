<script setup lang="ts">
import { ColProps } from '@/components/common/Grid/types'
import { CSSProperties } from 'vue'
import { useGridContext } from '@/components/common/Grid/hooks/useContext'
import { isNumber } from 'es-toolkit/compat'

const { span = 24, offset = 0, flex, suffix = false, xs, sm, md, lg, xl } = defineProps<ColProps>()

const responsive = [ xs, sm, md, lg, xl ]

const { space, getBreakpointRecodValue } = useGridContext()!

const flexAttribute = computed(() => {
  if (!flex) return `0 0 ${ (Number(span) / 24) * 100 }%`
  if (isNumber(flex)) return `${ flex } ${ flex } auto`
  return flex
})

const colStyle = computed<CSSProperties>(() => {
  return {
    flex: flexAttribute.value,
    marginLeft: suffix ? 'auto' : `${ (Number(offset) / 24) * 100 }%`,
    padding: `${ space.value[1] / 2 }px ${ space.value[0] / 2 }px ${ space.value[1] / 2 }px ${ space.value[0] / 2 }px`
  }
})
</script>

<template>
  <div class="col" :style="colStyle">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>