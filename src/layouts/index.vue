<script lang="ts" setup>
import LayoutHeader from '@/layouts/components/Header/index.vue'
import LayoutSidebar from '@/layouts/components/Sidebar/index.vue'
import LayoutMain from '@/layouts/components/Main.vue'
import LayoutFooter from '@/layouts/components/Footer.vue'
import TabBar from '@/layouts/components/TabBar/index.vue'
</script>

<template>
  <n-layout
    embedded
    has-sider
    class="h-full"
  >
    <layout-sidebar />
    <n-layout content-class="flex flex-col">
      <layout-header />
      <tab-bar />
      <layout-main />
      <layout-footer />
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>
