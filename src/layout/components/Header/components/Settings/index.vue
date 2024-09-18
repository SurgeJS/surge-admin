<script lang="ts" setup>
import IconHoverContainer from '@/layout/components/Header/components/HoverContainer.vue'
import ThemeMode from '@/layout/components/Header/components/Settings/components/ThemeMode.vue'
import LayoutMode from '@/layout/components/Header/components/Settings/components/LayoutMode.vue'
import LayoutStyle from '@/layout/components/Header/components/Settings/components/LayoutStyle.vue'
import SidebarConfig from '@/layout/components/Header/components/Settings/components/SidebarConfig.vue'
import HeaderConfig from '@/layout/components/Header/components/Settings/components/HeaderConfig.vue'
import FooterConfig from '@/layout/components/Header/components/Settings/components/FooterConfig.vue'
import OtherConfig from '@/layout/components/Header/components/Settings/components/OtherConfig.vue'
import ActionButton from '@/layout/components/Header/components/Settings/components/ActionButton.vue'
import { ref } from 'vue'
import ThemeColor from '@/layout/components/Header/components/Settings/components/ThemeColor.vue'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()

const width = computed(() => appStore.isMobile ? '100%' : 400)

const open = ref(false)
</script>

<template>
  <n-drawer
    v-model:show="open"
    :width="width"
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
