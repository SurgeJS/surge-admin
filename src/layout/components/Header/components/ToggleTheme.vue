<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import IconHoverContainer from '@/layout/components/Header/components/IconHoverContainer.vue'
import { computed } from 'vue'

const appStore = useAppStore()
const iconName = computed(() => appStore.base.themeMode === 'dark'
                                ? 'i-ant-design:moon-filled'
                                : 'i-ant-design:sun-filled')
</script>

<template>
  <icon-hover-container @click="appStore.setThemeMode(appStore.base.themeMode === 'dark'?'light': 'dark')">
    <icon :icon="iconName" />
  </icon-hover-container>
</template>

<style scoped>

</style>
