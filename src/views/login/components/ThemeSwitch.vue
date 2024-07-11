<script lang="ts" setup>
import useAppStore from '@/store/modules/app'

const settingStore = useAppStore()
</script>

<template>
  <icon
    v-if="settingStore.base.themeMode==='dark'"
    v-motion-fade
    icon="i-ant-design:moon-filled"
    color="#4f60fc"
    pointer
    @click="settingStore.setThemeMode('light')"
  />
  <icon
    v-else
    v-motion-fade
    icon="i-ant-design:sun-filled"
    color="#ffb948"
    pointer
    @click="settingStore.setThemeMode('dark')"
  />
</template>

<style scoped>

</style>
