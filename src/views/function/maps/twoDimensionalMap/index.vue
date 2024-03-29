<script lang="ts" setup>
import BaiduMap from './components/BaiduMap.vue'
import GaodeMap from './components/GaodeMap.vue'
import TencentMap from './components/TencentMap.vue'
import type { Component } from 'vue'

defineOptions({ name: 'FunctionTwoDimensionalMap' })

interface Map {
    label: string
    component: Component
}

const maps: Map[] = [
    {
        label: '百度地图',
        component: BaiduMap
    },
    {
        label: '高德地图',
        component: GaodeMap
    },
    {
        label: '腾讯地图',
        component: TencentMap
    }
]
</script>

<template>
  <a-card style="height: 100%">
    <a-tabs>
      <a-tab-pane
        v-for="item in maps"
        :key="item.label"
        :tab="item.label"
      >
        <component :is="item.component" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<style lang="scss" scoped>

</style>
