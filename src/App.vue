<script lang="ts" setup>
import { useGlobalInitialize } from '@/hooks/effect/useGlobalInitialize'
import { useGlobalSubscribe } from '@/hooks/effect/useGlobalSubscribe'
import { dateZhCN, zhCN } from 'naive-ui'
import useAppStore from '@/store/modules/app'
import AppConstant from '@/constant/app'


const breakpoints = useBreakpoints(Object.keys(AppConstant.SCREEN_BREAKPOINTS).reduce((b, k) => {
  b[k] = AppConstant.SCREEN_BREAKPOINTS[k][1]
  return b
}, {}))

console.log(breakpoints)

const appStore = useAppStore()
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
  >
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>
