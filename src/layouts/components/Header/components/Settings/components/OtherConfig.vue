<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import ContextMenu from '@/layouts/components/Header/components/Settings/components/ContextMenu.vue'

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

const { base } = appStore
</script>

<template>
  <n-divider>其他</n-divider>
  <n-flex>
    <context-menu label="开启页面切换动画">
      <n-switch v-model:value="base.isPageStartAnimation" />
    </context-menu>
    <context-menu label="页面切换动画风格">
      <n-select v-model:value="base.pageAnimationMode" :options="animationList" />
    </context-menu>
  </n-flex>
</template>

<style scoped>

</style>
