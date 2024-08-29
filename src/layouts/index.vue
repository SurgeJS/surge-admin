<script lang="ts" setup>
// import LayoutHeader from '@/layouts/components/Header/index.vue'
// import LayoutSidebar from '@/layouts/components/Sidebar/index.vue'
// import LayoutMain from '@/layouts/components/Main.vue'
// import LayoutFooter from '@/layouts/components/Footer.vue'
// import TabBar from '@/layouts/components/TabBar/index.vue'
</script>

<template>
  <n-layout has-sider class="h-full">
    <!--    <layout-sidebar />-->
    <!--    <n-layout>-->
    <!--      <layout-header />-->
    <!--      <tab-bar />-->
    <!--      <layout-main />-->
    <!--      <layout-footer />-->
    <!--    </n-layout>-->
    <n-layout-sider bordered>
      <p v-for="item in 1000" :key="item">{{ item }}</p>
    </n-layout-sider>
    <n-layout content-class="layout">
      <n-layout-header position="absolute" bordered>
        header
      </n-layout-header>
      <n-layout-content>
        <p v-for="item in 1000" :key="item">{{ item }}</p>
      </n-layout-content>
      <n-layout-footer position="absolute" bordered>
        footer
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
//.layout {
//  width: 100vw;
//  height: 100vh;
//  background: theme('backgroundColor.layout');
//  display: flex;
//
//  &-wrapper {
//    display: flex;
//    flex-direction: column;
//    flex: 1;
//    overflow: hidden;
//  }
//}

.layout {
  display: flex;
  flex-direction: column;
}
.n-layout-header {
  width: 100%;
  height: 50px;
  background: red;
}
</style>
