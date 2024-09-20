<script setup lang="ts">

import DefaultLayout from '@/views/component/schemaForm/components/DefaultLayout.vue'

const tabs = [
  {
    name:'默认布局',
    component:DefaultLayout
  },
  {
    name:'两栏布局',
    component:DefaultLayout
  },
  {
    name:'复杂布局',
    component:DefaultLayout
  },
  {
    name:'响应式表单',
    component:DefaultLayout
  },
  {
    name:'查询表单',
    component:DefaultLayout
  },
  {
    name:'分组表单',
    component:DefaultLayout
  },
  {
    name:'弹框&抽屉表单',
    component:DefaultLayout
  },
]
</script>

<template>
  <n-card
    class="h-full"
    content-class="h-full overflow-hidden"
  >
    <n-tabs
      pane-wrapper-class="flex-1"
      class="h-full"
      type="segment"
      animated
    >
      <n-tab-pane
        v-for="item in tabs"
        :key="item.name"
        class="h-full overflow-auto"
        :name="item.name"
        :tab="item.name"
      >
        <component :is="item.component" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style scoped lang="scss">

</style>