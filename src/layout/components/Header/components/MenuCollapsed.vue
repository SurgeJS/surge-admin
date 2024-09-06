<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'
import IconHoverContainer from '@/layout/components/Header/components/HoverContainer.vue'

const appStore = useAppStore()

const isCollapsed = computed(() => appStore.isMobile ? appStore.mobileSidebarVisible : appStore.isCollapsedSidebar)

const iconName = computed(() => isCollapsed.value
    ? 'i-ant-design:menu-unfold-outlined'
    : 'i-ant-design:menu-fold-outlined')
const handle = () => {
  appStore.isMobile ? appStore.toggleMobileSidebarVisible() : appStore.toggleSidebarCollapsed()
}
</script>

<template>
  <icon-hover-container @click="handle">
    <icon :icon="iconName" />
  </icon-hover-container>
</template>

<style scoped>

</style>
