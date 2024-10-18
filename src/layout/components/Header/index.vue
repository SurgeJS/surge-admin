<script lang="ts" setup>
import MenuSearch from '@/layout/components/Header/components/MenuSearch/index.vue'
import FullScreen from '@/layout/components/Header/components/FullScreen.vue'
import MenuCollapsed from '@/layout/components/Header/components/MenuCollapsed.vue'
import Breadcrumb from '@/layout/components/Header/components/Breadcrumb.vue'
import Avatar from '@/layout/components/Header/components/Avatar.vue'
import Settings from '@/layout/components/Header/components/Settings/index.vue'
import useAppStore from '@/store/modules/app'
import Menu from '@/layout/components/Menu/index.vue'
import useAuthStore from '@/store/modules/auth'
import Logo from '@/layout/components/Logo.vue'

defineOptions({ name: 'HeaderContent' })
const appStore = useAppStore()
const authStore = useAuthStore()
</script>

<template>
  <n-layout-header
    :style="{height:`${appStore.headerHeight}px`}"
    :inverted="appStore.isInvertedHeader"
    bordered
    class="layout-header"
  >
    <n-flex>
      <menu-collapsed v-if="appStore.isSmallScreen||appStore.layoutMode==='side'" />
      <breadcrumb v-if="appStore.layoutMode!=='top'&&appStore.breadcrumbVisible&&!appStore.isSmallScreen" />
      <Logo v-if="appStore.layoutMode==='top'&&!appStore.isSmallScreen" />
    </n-flex>
    <Menu
      v-if="appStore.layoutMode==='top'&&!appStore.isSmallScreen"
      :routes="authStore.routes"
      :inverted="appStore.isInvertedHeader"
      responsive
      mode="horizontal"
    />
    <n-flex :wrap="false" align="center">
      <theme-switch :inverted="appStore.isInvertedHeader" />
      <menu-search />
      <full-screen />
      <settings />
      <avatar />
    </n-flex>
  </n-layout-header>
</template>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  transition: height .2s ease-in-out;
  flex-shrink: 0;
}
</style>
