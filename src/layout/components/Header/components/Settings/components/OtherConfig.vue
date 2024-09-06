<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import ContextMenu from '@/layout/components/Header/components/Settings/components/ContextMenu.vue'

defineOptions({ name: '' })
const appStore = useAppStore()

const animationList = [
  {
    label: '缩放',
    value: 'zoom-fade'
  },
  {
    label: '左滑动',
    value: 'left-slide-fade'
  },
  {
    label: '右滑动',
    value: 'right-slide-fade'
  }
]

</script>

<template>
  <n-divider>其他</n-divider>
  <n-flex>
    <context-menu label="开启页面切换动画">
      <n-switch v-model:value="appStore.isPageStartAnimation" />
    </context-menu>
    <context-menu label="页面切换动画风格">
      <n-select v-model:value="appStore.pageAnimationMode" :options="animationList" />
    </context-menu>
  </n-flex>
</template>

<style scoped>

</style>
