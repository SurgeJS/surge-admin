<script lang="ts" setup>
import LayoutHeader from '@/layout/components/Header/index.vue'
import LayoutSidebar from '@/layout/components/Sidebar/index.vue'
import LayoutMain from '@/layout/components/Main.vue'
import LayoutFooter from '@/layout/components/Footer.vue'
import TabBar from '@/layout/components/TabBar/index.vue'
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
