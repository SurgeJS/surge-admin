<script setup lang="ts">
import gsap from 'gsap'
import {FoldAnimationProps} from '@/components/animation/FoldAnimation/types/type'

const props = withDefaults(defineProps<FoldAnimationProps>(), {
  duration: .5,
  appear: false,
  fixedLength: false,
  direction: 'vertical',
  initialLength: 0
})

const directionMap = computed(() => props.direction === 'vertical' ? 'height' : 'width')

const onBeforeEnter = (el: HTMLElement) => {
  gsap.from(el, {
    [directionMap.value]: props.initialLength,
    duration: props.duration,
    overflow: props.fixedLength ? undefined : 'hidden',
  })
}

const onEnter = (el: HTMLElement, done) => {
  gsap.to(el, {
    [directionMap.value]: props.fixedLength ? undefined : el.scrollHeight,
    duration: props.duration,
    onComplete: done
  })
}

const onLeave = (el: HTMLElement, done) => {
  gsap.to(el, {
    [directionMap.value]: props.initialLength,
    duration: props.duration,
    onComplete: done,
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