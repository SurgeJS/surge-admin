<script setup lang="ts">
import { CSSProperties } from 'vue'
import { RowProps } from '@/components/common/Grid/types'
import { useProvideGridContext } from '@/components/common/Grid/hooks/useContext'

const { gutter = 0 } = defineProps<RowProps>()

const { space } = useProvideGridContext(gutter)

const rowStyle = computed<CSSProperties>(() => {
  return {
    margin: `-${ space.value[1] / 2 }px -${ space.value[0] / 2 }px -${ space.value[1] / 2 }px -${ space.value[0] / 2 }px`
  }
})
</script>

<template>
  <div class="row" :style="rowStyle">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  flex-flow: wrap;
}
</style>