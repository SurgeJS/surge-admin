<script lang="ts" setup>
import ContextMenu from '@/layouts/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const { footer } = appStore
</script>

<template>
  <n-divider>底部</n-divider>
  <n-flex>
    <context-menu label="显示底部">
      <n-switch v-model:value="footer.visible" />
    </context-menu>
    <context-menu label="底部高度">
      <n-input-number v-model:value="footer.height" :step="10" />
    </context-menu>
  </n-flex>
</template>

<style scoped>

</style>
