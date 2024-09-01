<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'
import { wrapperMetaEnv } from '@/utils/env'

const { VITE_APP_TITLE } = wrapperMetaEnv()

const { sidebar, base, header } = useAppStore()
const isHide = computed(() => (sidebar.isCollapsed || base.layoutMode === 'mix-side') && !base.isMobile)
</script>

<template>
  <div class="logo" :style="{height:`${header.headerHeight}px`}">
    <img
      height="40"
      src="../../assets/images/logo.png"
      :alt="VITE_APP_TITLE"
    >
    <n-collapse-transition class="w-auto" :show="!isHide">
      <span class="logo-text">{{ VITE_APP_TITLE }}</span>
    </n-collapse-transition>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height .2s ease-in-out;
  padding: 10px;
  &-text {
    font-weight: bold;
    font-size: 18px;
    white-space: nowrap;
  }
}
</style>
