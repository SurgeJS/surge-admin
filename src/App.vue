<script lang="ts" setup>
import { useGlobalInitialize } from '@/hooks/effect/useGlobalInitialize'
import { useGlobalSubscribe } from '@/hooks/effect/useGlobalSubscribe'
import { dateZhCN, zhCN } from 'naive-ui'
// 全局初始化
useGlobalInitialize()

// 全局订阅
useGlobalSubscribe()
</script>

<template>
  <n-config-provider
    class="w-h-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <router-view />
  </n-config-provider>
</template>
