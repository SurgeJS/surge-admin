<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'
import MobileSidebar from '@/layout/components/Sidebar/components/MobileSidebar.vue'
import MixSidebar from '@/layout/components/Sidebar/components/MixSidebar/index.vue'
import SidebarComponent from '@/layout/components/Sidebar/components/Sidebar.vue'

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
    <div
      v-if="!base.isMobile && base.layoutMode!=='top'"
      :class="appStore.dynamicSidebarDark.className"
      :style="{width:`${sidebarWidth}px`}"
      class="layout-sidebar"
    >
      <transition name="slide-left">
        <sidebar-component v-if="base.layoutMode==='side'" />
        <mix-sidebar v-else-if="base.layoutMode==='mix-side'" />
      </transition>
    </div>
  </transition>
  <mobile-sidebar v-if="base.isMobile" />
</template>

<style lang="scss" scoped>
.layout-sidebar {
  background: theme('backgroundColor.container');
  display: flex;
  flex-direction: column;
  position: relative;
  transition: width .2s ease-in-out;
  overflow: hidden;

  &.dark {
    background: theme('backgroundColor.dark');
    color: theme('textColor.light');
  }

  &-container {
    flex: 1;
    overflow: auto;
    width: 100%;
  }
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
