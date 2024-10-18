<script setup lang="ts">
import { CSSProperties } from 'vue'
import { RowProps } from '@/components/common/Grid/types'
import { isArray } from 'lodash-es'

const { gutter } = defineProps<RowProps>()

const space = computed(() => isArray(gutter) ? gutter : [ gutter, 0 ])

const rowStyle = computed<CSSProperties>(() => {
  return {
    margin: `-${ space[1] / 2 }px -${ space[0] / 2 }px -${ space[1] / 2 }px -${ space[0] / 2 }px`
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