<script lang="ts" setup>
import IconHoverContainer from '@/layouts/components/Header/components/HoverContainer.vue'
import ThemeMode from '@/layouts/components/Header/components/Settings/components/ThemeMode.vue'
import LayoutMode from '@/layouts/components/Header/components/Settings/components/LayoutMode.vue'
import LayoutStyle from '@/layouts/components/Header/components/Settings/components/LayoutStyle.vue'
import SidebarConfig from '@/layouts/components/Header/components/Settings/components/SidebarConfig.vue'
import HeaderConfig from '@/layouts/components/Header/components/Settings/components/HeaderConfig.vue'
import FooterConfig from '@/layouts/components/Header/components/Settings/components/FooterConfig.vue'
import OtherConfig from '@/layouts/components/Header/components/Settings/components/OtherConfig.vue'
import ActionButton from '@/layouts/components/Header/components/Settings/components/ActionButton.vue'
import { ref } from 'vue'
import ThemeColor from '@/layouts/components/Header/components/Settings/components/ThemeColor.vue'

defineOptions({ name: 'Settings' })

const open = ref(false)
</script>

<template>
  <n-drawer
    v-model:show="open"
    :width="400"
    title="系统配置"
  >
    <n-drawer-content closable title="系统配置">
      <theme-mode />
      <theme-color />
      <layout-mode />
      <layout-style />
      <sidebar-config />
      <header-config />
      <footer-config />
      <other-config />
      <template #footer>
        <action-button />
      </template>
    </n-drawer-content>
  </n-drawer>
  <icon-hover-container @click="open=!open">
    <icon icon="i-ic:baseline-settings" />
  </icon-hover-container>
</template>

<style lang="scss" scoped>

</style>
