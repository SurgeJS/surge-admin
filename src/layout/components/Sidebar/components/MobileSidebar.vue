<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import Logo from '@/layout/components/Logo.vue'
import Menu from '@/layout/components/Menu/index.vue'
import useAuthStore from '@/store/modules/auth'

const appStore = useAppStore()
const authStore = useAuthStore()
</script>

<template>
  <n-drawer
    v-model:show="appStore.mobileSidebarVisible"
    width="280px"
    placement="left"
  >
    <div class="mobileSidebar" :class="{inverted:appStore.isInvertedSidebar}">
      <logo />
      <div class="mobileSidebar-container">
        <Menu :inverted="appStore.isInvertedSidebar" :routes="authStore.routes" />
      </div>
    </div>
  </n-drawer>
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

  &.inverted {
    background: theme('backgroundColor.inverted');
    color: theme('textColor.inverted');
  }

  &-container {
    flex: 1;
    overflow: auto;
  }
}
</style>
