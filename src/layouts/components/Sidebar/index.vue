<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'
import MobileSidebar from '@/layouts/components/Sidebar/components/MobileSidebar.vue'
import SidebarComponent from '@/layouts/components/Sidebar/components/Sidebar.vue'
import MixSidebar from '@/layouts/components/Sidebar/components/MixSidebar/index.vue'

defineOptions({ name: 'LayoutSidebar' })

const appStore = useAppStore()
const { sidebar, base } = appStore

const sidebarWidth = computed(() => {
  switch (base.layoutMode) {
    case 'side':
      return appStore.dynamicSidebarWidth
    case 'mix-side':
      return sidebar.isFixedMixSidebarDrawer ?
          appStore.dynamicMixSidebarWidth + sidebar.sidebarWidth :
          appStore.dynamicMixSidebarWidth
    default:
      return sidebar.sidebarWidth
  }
})
</script>

<template>
  <transition name="fold">
    <n-layout-sider
      v-if="!base.isMobile && base.layoutMode!=='top'"
      bordered
      class="layout-sidebar"
      content-class="min-w-100%!"
      :width="sidebarWidth"
      :collapsed-width="sidebar.collapsedSidebarWidth"
    >
      <transition name="slide-left">
        <sidebar-component v-if="base.layoutMode==='side'" />
        <mix-sidebar v-else-if="base.layoutMode==='mix-side'" />
      </transition>
    </n-layout-sider>
  </transition>
  <mobile-sidebar v-if="base.isMobile" />
</template>

<style lang="scss" scoped>
.layout-sidebar {
  transition: .2s ease-in-out !important;
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
