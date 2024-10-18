<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'
import MobileSidebar from '@/layout/components/Sidebar/components/MobileSidebar.vue'
import SidebarComponent from '@/layout/components/Sidebar/components/Sidebar.vue'
import MixSidebar from '@/layout/components/Sidebar/components/MixSidebar/index.vue'

defineOptions({ name: 'LayoutSidebar' })

const appStore = useAppStore()

const sidebarWidth = computed(() => {
  switch (appStore.layoutMode) {
    case 'side':
      return appStore.dynamicSidebarWidth
    case 'mix-side':
      return appStore.isFixedMixSidebarDrawer ?
          appStore.dynamicMixSidebarWidth + appStore.sidebarWidth :
          appStore.dynamicMixSidebarWidth
    default:
      return appStore.sidebarWidth
  }
})
</script>

<template>
  <transition name="fold">
    <n-layout-sider
      v-if="!appStore.isSmallScreen && appStore.layoutMode!=='top'"
      bordered
      class="layout-sidebar"
      content-class="min-w-100%! overflow-visible!"
      :width="sidebarWidth"
      :inverted="appStore.isInvertedSidebar"
      :collapsed-width="appStore.collapsedSidebarWidth"
    >
      <transition name="slide-left">
        <sidebar-component v-if="appStore.layoutMode==='side'" />
        <mix-sidebar v-else-if="appStore.layoutMode==='mix-side'" />
      </transition>
    </n-layout-sider>
  </transition>
  <mobile-sidebar v-if="appStore.isSmallScreen" />
</template>

<style lang="scss" scoped>
.layout-sidebar {
  height: 100%;
  transition: width .2s ease-in-out, .2s ease-in-out;
  z-index: 100;
}

// 左滑
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all .25s ease-in-out !important;
  position: absolute !important;
}

.slide-left-enter-from {
  opacity: 0;
  transform: scale(.9) translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: scale(.9) translateX(-30px);
}
</style>
