<script setup lang="ts">
import { FoldAnimationProps } from '@/components/animation/FoldAnimation/types/type'

const props = withDefaults(defineProps<FoldAnimationProps>(), {
  duration: .5,
  appear: false,
  fixedLength: false,
  direction: 'vertical',
  initialLength: 0
})

const directionMap = computed(() => props.direction === 'vertical' ? 'height' : 'width')
console.log(gsap.from())
</script>

<template>
  <slot ref="target" />
</template>

<style scoped lang="scss">

</style>