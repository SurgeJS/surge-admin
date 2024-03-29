<script lang="ts" setup>
import MenuSearch from '@/layout/components/Header/components/MenuSearch/index.vue'
import FullScreen from '@/layout/components/Header/components/FullScreen.vue'
import Github from '@/layout/components/Header/components/Github.vue'
import MenuCollapsed from '@/layout/components/Header/components/MenuCollapsed.vue'
import Breadcrumb from '@/layout/components/Header/components/Breadcrumb.vue'
import ToggleTheme from '@/layout/components/Header/components/ToggleTheme.vue'
import Avatar from '@/layout/components/Header/components/Avatar.vue'
import Settings from '@/layout/components/Header/components/Settings/index.vue'
import useAppStore from '@/store/modules/app'
import Menu from '@/layout/components/Menu.vue'
import useAuthStore from '@/store/modules/auth'
import Logo from '@/layout/components/Logo.vue'

defineOptions({ name: 'HeaderContent' })
const appStore = useAppStore()
const { base,header } = appStore
const authStore = useAuthStore()
</script>

<template>
  <div
    :class="appStore.dynamicTopDark.className"
    :style="{height:`${header.headerHeight}px`}"
    class="layout-header"
  >
    <a-flex gap="small">
      <menu-collapsed v-if="base.isMobile||base.layoutMode==='side'" />
      <breadcrumb v-if="base.layoutMode!=='top'&&header.breadcrumbVisible&&!base.isMobile" />
      <template v-if="base.layoutMode==='top'&&!base.isMobile">
        <Logo />
        <Menu
          :dark="appStore.dynamicTopDark.isDark"
          :menus="authStore.routes"
          horizontal
        />
      </template>
    </a-flex>
    <a-flex gap="small" justify="flex-end">
      <menu-search />
      <toggle-theme />
      <full-screen />
      <github />
      <avatar />
      <settings />
    </a-flex>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 56px;
  background: theme('backgroundColor.container');
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  overflow: hidden;
  border-bottom: 1px solid theme('borderColor.secondary');
  flex-shrink: 0;
  transition: height .2s ease-in-out;

  &.dark {
    background: theme('backgroundColor.dark');
    color: theme('textColor.light');
    border-bottom: 1px solid theme('borderColor.dark');
  }

  &.fixed {

  }

  &-menu {
    flex: 1;
  }
}
</style>
