<script lang="ts" setup>
import useAppStore from '@/store/modules/app'

const settingStore = useAppStore()
</script>

<template>
  <i-ic:baseline-mode-night
    v-if="settingStore.base.themeMode==='dark'"
    class="text-[#4f60fc] text-xl cursor-pointer"
    @click="settingStore.setThemeMode('light')"
  />
  <i-ic:baseline-wb-sunny
    v-else
    class="text-[#ffb948] text-xl cursor-pointer"
    @click="settingStore.setThemeMode('dark')"
  />
</template>

<style scoped>

</style>
