<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import MapConfig from '@/config/map'
import { onMounted, ref } from 'vue'

const { load } = useScriptTag(MapConfig.TENCENT_MAP_SDK_URL)

const mapRef = ref<HTMLElement | null>(null)

const renderMap = async () => {
    await load(true)
    if (!mapRef.value) return
    new TMap.Map(mapRef.value, {
        center: new TMap.LatLng(39.984120, 116.307484),
        zoom: 11,
        viewMode: '3D'
    })
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
