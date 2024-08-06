<template>
  <a-divider>
    主题颜色
  </a-divider>
  <a-flex justify="space-between">
    <div
      v-for="item in AppConfig.THEME_COLOR"
      :key="item"
      :style="{background:item}"
      class="themeCard"
      @click="appStore.setThemeColor(item)"
    >
      <icon v-if="appStore.base.themeColor===item" icon="i-ant-design:check-outlined" />
    </div>
  </a-flex>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import AppConfig from '@/config/app'

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.themeCard {
  width: 20px;
  height: 20px;
  border-radius: theme('borderRadius.sm');
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
</style>
