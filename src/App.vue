<script lang="ts" setup>
import { useGlobalInitialize } from '@/hooks/effect/useGlobalInitialize'
import { useGlobalSubscribe } from '@/hooks/effect/useGlobalSubscribe'
import { dateZhCN, zhCN } from 'naive-ui'
import AppConstant from '@/constant/app'
import useAppStore from '@/store/modules/app'

// 全局初始化
useGlobalInitialize()

// 全局订阅
useGlobalSubscribe()

const appStore = useAppStore()
</script>

<template>
  <n-config-provider
    class="w-h-full"
    inline-theme-disabled
    :theme="appStore.theme"
    :theme-overrides="AppConstant.LIGHT_THEME"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>
