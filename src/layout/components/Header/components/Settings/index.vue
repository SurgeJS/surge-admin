<script lang="ts" setup>
import ThemeMode from '@/layout/components/Header/components/Settings/components/ThemeMode.vue'
import LayoutMode from '@/layout/components/Header/components/Settings/components/LayoutMode.vue'
import LayoutStyle from '@/layout/components/Header/components/Settings/components/LayoutStyle.vue'
import SidebarConfig from '@/layout/components/Header/components/Settings/components/SidebarConfig.vue'
import HeaderConfig from '@/layout/components/Header/components/Settings/components/HeaderConfig.vue'
import FooterConfig from '@/layout/components/Header/components/Settings/components/FooterConfig.vue'
import OtherConfig from '@/layout/components/Header/components/Settings/components/OtherConfig.vue'
import ActionButton from '@/layout/components/Header/components/Settings/components/ActionButton.vue'
import ThemeColor from '@/layout/components/Header/components/Settings/components/ThemeColor.vue'
import useAppStore from '@/store/modules/app'
import { ref } from 'vue'

const appStore = useAppStore()

const open = ref(false)
</script>

<template>
  <n-drawer
    v-model:show="open"
    width="400"
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
  <hover-container :inverted="appStore.isInvertedHeader" @click="open=!open">
    <icon icon="i-ic:baseline-settings" />
  </hover-container>
</template>

<style lang="scss" scoped>

</style>
