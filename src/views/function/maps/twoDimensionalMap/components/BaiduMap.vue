<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import MapConfig from '@/config/map'
import { onMounted,ref } from 'vue'

const { load } = useScriptTag(MapConfig.BAIDU_MAP_SDK_URL)

const mapRef = ref<HTMLElement | null>(null)

const renderMap = async () => {
  await load(true)
  if (!mapRef.value) return
  const map = new BMap.Map(mapRef.value)
  const point = new BMap.Point(114.05834626586915,22.546789983033168)
  map.centerAndZoom(point,15)
  map.enableScrollWheelZoom()
}

onMounted(() => {
  renderMap()
})
</script>

<template>
  <div ref="mapRef" class="baiduMap" />
</template>

<style lang="scss" scoped>
.baiduMap {
  width: 100%;
  height: 100%;
}
</style>
