<script lang="ts" setup>
import { useGlobalInitialize } from '@/hooks/effect/useGlobalInitialize'
import { useGlobalSubscribe } from '@/hooks/effect/useGlobalSubscribe'
import { dateZhCN, zhCN } from 'naive-ui'
import useAppStore from '@/store/modules/app'
import AppConstant from '@/constant/app.ts'

const appStore = useAppStore()
console.log(appStore)
// 全局初始化
useGlobalInitialize()

// 全局订阅
useGlobalSubscribe()
</script>

<template>
  <n-config-provider
    class="w-h-full"
    inline-theme-disabled
    :theme="appStore.naiveTheme"
    :theme-overrides="appStore.themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :breakpoints="AppConstant.SCREEN_BREAKPOINTS"
  >
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>
