<script lang="ts" setup>
import { useGlobalInitialize } from '@/hooks/effect/useGlobalInitialize'
import { useGlobalSubscribe } from '@/hooks/effect/useGlobalSubscribe'
import useAppStore from '@/store/modules/app'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const appStore = useAppStore()
// 全局初始化
useGlobalInitialize()

// 全局订阅
useGlobalSubscribe()
</script>

<template>
  <a-config-provider
      :locale="zhCN"
      :auto-insert-space-in-button="appStore.antdConfig.autoInsertSpaceInButton"
      :component-size="appStore.antdConfig.size"
      :theme="appStore.themeConfig"
  >
    <a-app>
      <router-view />
    </a-app>
  </a-config-provider>
</template>
