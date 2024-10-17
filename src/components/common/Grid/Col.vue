<script setup lang="ts">
import { ColProps } from '@/components/common/Grid/types'
import { CSSProperties } from 'vue'

const { span = 24,offset = 0 } = defineProps<ColProps>()

const colStyle = computed<CSSProperties>(() => {
  return {
    flex: `0 0 ${(span / 24) * 100}%`,
    marginLeft: `${(props.offset / 24) * 100}%`,
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