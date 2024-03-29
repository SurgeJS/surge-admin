<script lang="ts" setup>
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const { footer } = appStore
</script>

<template>
  <a-divider>底部</a-divider>
  <a-flex gap="middle" vertical>
    <context-menu label="显示底部">
      <a-switch v-model:checked="footer.visible" />
    </context-menu>
    <context-menu label="底部高度">
      <a-input-number
        v-model:value="footer.height"
        :step="10"
        addon-after="px"
        mode="button"
      />
    </context-menu>
  </a-flex>
</template>

<style scoped>

</style>
