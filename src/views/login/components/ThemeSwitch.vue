<script lang="ts" setup>
import useAppStore from '@/store/modules/app'

const settingStore = useAppStore()
</script>

<template>
  <i
    v-if="settingStore.base.themeMode==='dark'"
    v-motion-fade
    class="i-ant-design:moon-filled text-[#4f60fc]  cursor-pointer"
    @click="settingStore.setThemeMode('light')"
  />
  <i
    v-else
    v-motion-fade
    class="i-ant-design:sun-filled text-[#ffb948]  cursor-pointer"
    @click="settingStore.setThemeMode('dark')"
  />
</template>

<style scoped>

</style>
