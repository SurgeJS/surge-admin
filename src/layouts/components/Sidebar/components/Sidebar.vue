<script lang="ts" setup>
import Logo from '@/layouts/components/Logo.vue'
import Menu from '@/layouts/components/Menu/index.vue'

import useAppStore from '@/store/modules/app'
import useAuthStore from '@/store/modules/auth'

const appStore = useAppStore()
const { sidebar } = appStore

const authStore = useAuthStore()
</script>

<template>
  <div
    :class="appStore.dynamicSidebarDark.className"
    :style="{width:`${appStore.dynamicSidebarWidth}px`}"
    class="sidebar"
  >
    <logo />
    <div class="sidebar-container">
      <Menu
        :inline-collapsed="sidebar.isCollapsed"
        :dark="appStore.dynamicSidebarDark.isDark"
        :routes="authStore.routes"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width .2s;
  border-right: 1px solid theme('borderColor.secondary');

  &.dark {
    border-right: 1px solid theme('borderColor.dark');
  }

  &-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
