<script lang="ts" setup>
import Logo from '@/layouts/components/Logo.vue'
import Menu from '@/layouts/components/Menu/index.vue'

import useAppStore from '@/store/modules/app'
import useAuthStore from '@/store/modules/auth'

const appStore = useAppStore()
const { sidebar } = appStore

const authStore = useAuthStore()
</script>

<template>
  <div class="w-full flex flex-col">
    <logo />
    <div class="flex-1 overflow-x-hidden overflow-y-auto">
      <Menu
        :collapsed="sidebar.isCollapsed"
        :collapsed-width="sidebar.collapsedSidebarWidth"
        :routes="authStore.routes"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
