<script setup lang="ts">
import { LayLoadProps } from '@/components/common/LazyLoad/type'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

defineProps<LayLoadProps>()

const isVisible = ref<boolean>(false)
const target = ref<HTMLDivElement>(null)
useIntersectionObserver(
    target,
    ([ { isIntersecting } ], observerElement) => {
      console.log(observerElement)
      console.log(isIntersecting)
      isVisible.value = isIntersecting
    }
)
</script>

<template>
  <div ref="target">
    <slot :is-visible="isVisible" />
  </div>
</template>

<style scoped lang="scss">

</style>
