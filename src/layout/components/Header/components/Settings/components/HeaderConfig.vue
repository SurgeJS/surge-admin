<script lang="ts" setup>
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
</script>

<template>
  <n-divider>头部</n-divider>
  <n-flex>
    <context-menu label="头部高度">
      <n-input-number v-model:value="appStore.headerHeight" :step="10" />
    </context-menu>
    <context-menu label="标签栏高度">
      <n-input-number v-model:value="appStore.tabBarHeight" :step="10" />
    </context-menu>
    <context-menu label="显示标签栏">
      <n-switch v-model:value="appStore.tabBarVisible" />
    </context-menu>
    <context-menu label="显示面包屑">
      <n-switch v-model:value="appStore.breadcrumbVisible" />
    </context-menu>
  </n-flex>
</template>

<style scoped>

</style>
