<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useScriptTag } from '@vueuse/core'
import MapConfig from '@/config/map'

const { load } = useScriptTag(MapConfig.GAODE_MAP_SDK_URL)
const mapRef = ref<HTMLElement | null>(null)
const renderMap = async () => {
    await load(true)
    if (!mapRef.value) return
    new AMap.Map(mapRef.value, {
        viewMode: '2D',
        zoom: 11,
        center: [116.397428, 39.90923]
    })
}

onMounted(() => {
    renderMap()
})
</script>

<template>
  <div ref="mapRef" class="baiduMap" />
</template>

<style scoped>
.baiduMap {
    width: 100%;
    height: 100%;
}
</style>
