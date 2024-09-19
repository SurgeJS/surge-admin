<script setup lang="ts">
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()

const iconConfig = computed(() => {
  let icon: string
  let tooltip: string

  switch (appStore.themeMode) {
    case 'dark':
      icon = 'i-ic:sharp-dark-mode'
      tooltip = '暗黑模式'
      break
    case 'light':
      icon = 'i-ic:baseline-wb-sunny'
      tooltip = '明亮模式'
      break
    case 'system':
      icon = 'i-ic:round-hdr-auto'
      tooltip = '跟随系统'
      break
  }
  return { icon, tooltip }
})

</script>

<template>
  <hover-container :tooltip="iconConfig.tooltip" @click="appStore.switchThemeMode()">
    <icon :icon="iconConfig.icon" />
  </hover-container>
</template>

<style scoped lang="scss">

</style>