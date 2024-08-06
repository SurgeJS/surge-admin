<script lang="ts" setup>
import ContextMenu from '@/layouts/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const { sidebar } = appStore
</script>

<template>
  <a-divider>侧边栏</a-divider>
  <a-flex gap="middle" vertical>
    <context-menu label="折叠侧边栏">
      <a-switch v-model:checked="sidebar.isCollapsed" />
    </context-menu>
    <context-menu label="侧边栏折叠宽度">
      <a-input-number
        v-model:value="sidebar.sidebarWidth"
        :step="10"
        addon-after="px"
        mode="button"
      />
    </context-menu>
    <context-menu label="折叠混合侧边栏">
      <a-switch v-model:checked="sidebar.isCollapsedMix" />
    </context-menu>
    <context-menu label="混合侧边栏宽度">
      <a-input-number
        v-model:value="sidebar.mixSidebarWidth"
        :step="10"
        addon-after="px"
        mode="button"
      />
    </context-menu>
    <context-menu label="侧边栏折叠宽度">
      <a-input-number
        v-model:value="sidebar.collapsedSidebarWidth"
        :step="10"
        addon-after="px"
        disabled
        mode="button"
      />
    </context-menu>
    <context-menu label="菜单开启手风琴模式">
      <a-switch v-model:checked="sidebar.isMenuAccordion" />
    </context-menu>
  </a-flex>
</template>

<style scoped>

</style>
