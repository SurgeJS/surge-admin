<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { computed } from 'vue'
import IconHoverContainer from '@/layout/components/Header/components/IconHoverContainer.vue'

const { isFullscreen,toggle } = useFullscreen()
const iconComponent = computed(()=>!isFullscreen ? IAntDesignExpandOutlined : IAntDesignCompressOutlined)
</script>

<template>
  <icon-hover-container @click="toggle">
    <component :is="iconComponent" />
  </icon-hover-container>
</template>
