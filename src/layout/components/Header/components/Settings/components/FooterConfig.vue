<script lang="ts" setup>
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
</script>

<template>
  <n-divider>底部</n-divider>
  <n-flex>
    <context-menu label="显示底部">
      <n-switch v-model:value="appStore.footerVisible" />
    </context-menu>
    <context-menu label="底部高度">
      <n-input-number v-model:value="appStore.footerHeight" :step="10" />
    </context-menu>
  </n-flex>
</template>

<style scoped>

</style>
