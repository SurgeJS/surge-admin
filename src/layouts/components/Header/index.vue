<script lang="ts" setup>
import MenuSearch from '@/layouts/components/Header/components/MenuSearch/index.vue'
import FullScreen from '@/layouts/components/Header/components/FullScreen.vue'
import MenuCollapsed from '@/layouts/components/Header/components/MenuCollapsed.vue'
import Breadcrumb from '@/layouts/components/Header/components/Breadcrumb.vue'
import Avatar from '@/layouts/components/Header/components/Avatar.vue'
import Settings from '@/layouts/components/Header/components/Settings/index.vue'
import useAppStore from '@/store/modules/app'
import Menu from '@/layouts/components/Menu/index.vue'
import useAuthStore from '@/store/modules/auth'
import Logo from '@/layouts/components/Logo.vue'

defineOptions({ name: 'HeaderContent' })
const appStore = useAppStore()
const { base, header } = appStore
const authStore = useAuthStore()
</script>

<template>
  <n-layout-header
    :style="{height:`${header.headerHeight}px`}"
    :inverted="appStore.sidebarAndHeaderInverted"
    bordered
    class="layout-header"
  >
    <n-flex>
      <menu-collapsed v-if="base.isMobile||base.layoutMode==='side'" />
      <breadcrumb v-if="base.layoutMode!=='top'&&header.breadcrumbVisible&&!base.isMobile" />
      <Logo v-if="base.layoutMode==='top'&&!base.isMobile" />
    </n-flex>
    <Menu
      v-if="base.layoutMode==='top'&&!base.isMobile"
      :routes="authStore.routes"
      :inverted="appStore.sidebarAndHeaderInverted"
      responsive
      mode="horizontal"
    />
    <n-flex :wrap="false" align="center">
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
