<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { computed } from 'vue'
import IconHoverContainer from '@/layouts/components/Header/components/HoverContainer.vue'

const { isFullscreen,toggle } = useFullscreen()
const iconName = computed(() => !isFullscreen ? 'i-ant-design:expand-outlined' : 'i-ant-design:compress-outlined')
</script>

<template>
  <icon-hover-container @click="toggle">
    <icon :icon="iconName" />
  </icon-hover-container>
</template>
