<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import Logo from '@/layout/components/Logo.vue'
import Menu from '@/layout/components/Menu/index.vue'
import useAuthStore from '@/store/modules/auth'

const appStore = useAppStore()
const { sidebar } = appStore
const authStore = useAuthStore()
</script>

<template>
  <a-drawer
    v-model:open="sidebar.mobileSidebarVisible"
    :closable="false"
    :width="sidebar.sidebarWidth"
    placement="left"
  >
    <div :class="appStore.dynamicSidebarDark.className" class="mobileSidebar ">
      <logo />
      <div class="mobileSidebar-container">
        <Menu :dark="appStore.dynamicSidebarDark.isDark" :routes="authStore.routes" />
      </div>
    </div>
  </a-drawer>
</template>

<style lang="scss" scoped>
.mobileSidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;

  &.dark {
    background: theme('backgroundColor.dark');
    color: theme('textColor.light');
  }

  &-container {
    display: flex;
    overflow: auto;
  }
}
</style>
