<script lang="ts" setup>
import ContextMenu from '@/layouts/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const { sidebar } = appStore
</script>

<template>
  <n-divider>侧边栏</n-divider>
  <n-flex>
    <context-menu label="折叠侧边栏">
      <n-switch v-model:value="sidebar.isCollapsed" />
    </context-menu>
    <context-menu label="侧边栏宽度">
      <n-input-number v-model:value="sidebar.sidebarWidth" :step="40" />
    </context-menu>
    <context-menu label="折叠混合侧边栏">
      <n-switch v-model:value="sidebar.isCollapsedMix" />
    </context-menu>
    <context-menu label="混合侧边栏宽度">
      <n-input-number v-model:value="sidebar.mixSidebarWidth" :step="10" />
    </context-menu>
    <context-menu label="侧边栏折叠宽度">
      <n-input-number v-model:value="sidebar.collapsedSidebarWidth" :step="10" />
    </context-menu>
    <context-menu label="菜单开启手风琴模式">
      <n-switch v-model:value="sidebar.isMenuAccordion" />
    </context-menu>
  </n-flex>
</template>

<style scoped>

</style>
