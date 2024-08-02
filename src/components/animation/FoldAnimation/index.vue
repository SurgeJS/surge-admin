<script setup lang="ts">
import gsap from 'gsap'
import { FoldAnimationProps } from '@/components/animation/FoldAnimation/types/type'

const props = withDefaults(defineProps<FoldAnimationProps>(), {
  duration: .5,
  appear: false,
  fixedLength: false,
  initialLength: 0
})

const onBeforeEnter = (el: HTMLElement) => {
  gsap.from(el, {
    duration: props.duration,
    height: props.initialLength,
    overflow: props.fixedLength ? undefined : 'hidden',
  })
}
const onEnter = (el: HTMLElement, done) => {
  gsap.to(el, {
    duration: props.duration,
    height: props.fixedLength ? undefined : el.scrollHeight,
    onComplete: done
  })
}
const onLeave = (el, done) => {
  gsap.to(el, {
    duration: props.duration,
    height: props.initialLength,
    onComplete: done
  })
}
</script>

<template>
  <transition
    :css="false"
    :appear
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </transition>
</template>

<style scoped lang="scss">

</style>