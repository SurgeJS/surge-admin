<script lang="ts" setup>
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
</script>

<template>
  <n-divider>侧边栏</n-divider>
  <n-flex>
    <context-menu label="折叠侧边栏">
      <n-switch v-model:value="appStore.isCollapsedSidebar" />
    </context-menu>
    <context-menu label="侧边栏宽度">
      <n-input-number v-model:value="appStore.sidebarWidth" :step="40" />
    </context-menu>
    <context-menu label="折叠混合侧边栏">
      <n-switch v-model:value="appStore.isCollapsedMixSidebar" />
    </context-menu>
    <context-menu label="混合侧边栏宽度">
      <n-input-number v-model:value="appStore.mixSidebarWidth" :step="10" />
    </context-menu>
    <context-menu label="侧边栏折叠宽度">
      <n-input-number v-model:value="appStore.collapsedSidebarWidth" :step="10" />
    </context-menu>
    <context-menu label="菜单开启手风琴模式">
      <n-switch v-model:value="appStore.isMenuAccordion" />
    </context-menu>
  </n-flex>
</template>

<style scoped>

</style>
