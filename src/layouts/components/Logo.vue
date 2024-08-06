<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'

const { sidebar,base,header } = useAppStore()
const isHide = computed(() => (sidebar.isCollapsed || base.layoutMode === 'mix-side') && !base.isMobile)
</script>

<template>
  <div class="logo" :style="{height:`${header.headerHeight}px`}">
    <img
      height="28"
      src="../../assets/images/logo.png"
      alt=""
    >
    <span v-if="!isHide" class="logo-text">Simple Admin</span>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: height .2s ease-in-out;

  &-text {
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
  }
}
</style>
