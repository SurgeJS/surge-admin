<script setup lang="ts">
import { ColProps } from '@/components/common/Grid/types'
import { CSSProperties } from 'vue'

const { span = 24,offset = 0 } = defineProps<ColProps>()

const colStyle = computed<CSSProperties>(() => {
  return {
    flex: `0 0 ${(Number(span) / 24) * 100}%`,
    marginLeft: `${(Number(offset) / 24) * 100}%`,
    paddingLeft: `${10 / 2}px`,
    paddingRight: `${10 / 2}px`,
    padding:`${10 / 2}px ${10 / 2}px ${10 / 2}px ${10 / 2}px`
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