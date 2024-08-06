<script lang="ts" setup>
import LayoutHeader from '@/layouts/components/Header/index.vue'
import LayoutSidebar from '@/layouts/components/Sidebar/index.vue'
import LayoutMain from '@/layouts/components/Main.vue'
import LayoutFooter from '@/layouts/components/Footer.vue'
import TabBar from '@/layouts/components/TabBar/index.vue'

defineOptions({ name: 'Layout' })
</script>

<template>
  <div class="layout ">
    <layout-sidebar />
    <div class="layout-wrapper">
      <layout-header />
      <tab-bar />
      <layout-main />
      <layout-footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background: theme('backgroundColor.layout');
  display: flex;

  &-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
}
</style>
