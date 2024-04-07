<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { computed } from 'vue'
import IconHoverContainer from '@/layout/components/Header/components/IconHoverContainer.vue'

const { isFullscreen,toggle } = useFullscreen()
const iconName = computed(() => !isFullscreen ? 'i-ant-design:expand-outlined' : 'i-ant-design:compress-outlined')
</script>

<template>
  <icon-hover-container @click="toggle">
    <i :class="iconName" />
  </icon-hover-container>
</template>
