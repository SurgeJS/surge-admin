<script lang="ts" setup>
import LayoutHeader from '@/layout/components/Header/index.vue'
import LayoutSidebar from '@/layout/components/Sidebar/index.vue'
import LayoutMain from '@/layout/components/Main.vue'
import LayoutFooter from '@/layout/components/Footer.vue'
import TabBar from '@/layout/components/TabBar/index.vue'

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
