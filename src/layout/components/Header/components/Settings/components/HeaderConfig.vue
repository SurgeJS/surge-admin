<script lang="ts" setup>
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const { header } = appStore
</script>

<template>
  <a-divider>头部</a-divider>
  <a-flex gap="middle" vertical>
    <context-menu label="头部高度">
      <a-input-number
        v-model:value="header.headerHeight"
        :step="10"
        addon-after="px"
        mode="button"
      />
    </context-menu>
    <context-menu label="标签栏高度">
      <a-input-number
        v-model:value="header.tabBarHeight"
        :step="10"
        addon-after="px"
        mode="button"
      />
    </context-menu>
    <context-menu label="显示标签栏">
      <a-switch v-model:checked="header.tabBarVisible" />
    </context-menu>
    <context-menu label="显示面包屑">
      <a-switch v-model:checked="header.breadcrumbVisible" />
    </context-menu>
  </a-flex>
</template>

<style scoped>

</style>
