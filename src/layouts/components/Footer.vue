<script lang="ts" setup>
import useAppStore from '@/store/modules/app'

defineOptions({ name: 'LayoutFooter' })
const appStore = useAppStore()
const { footer } = appStore
</script>

<template>
  <n-layout-footer
    v-if="footer.visible"
    bordered
    :style="{height:`${footer.height}px`}"
    class="layoutFooter"
  >
    Copyright ©2022 Simple Admin
  </n-layout-footer>
</template>

<style lang="scss" scoped>
.layoutFooter {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: height .2s ease-in-out;
  background: theme('backgroundColor.container');
  width: 100%;
  flex-shrink: 0;
}
</style>
