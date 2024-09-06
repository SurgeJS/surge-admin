<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'
import PageTransition from '@/layout/components/PageTransition.vue'
import FullScreenLoading from '@/layout/components/FullScreenLoading.vue'

const tabBarStore = useTabBarStore()
const appStore = useAppStore()

const transitionName = computed(() => appStore.isPageStartAnimation ? appStore.pageAnimationMode : undefined)
</script>

<template>
  <n-layout-content content-class="flex-1 flex-shrink-0 p-[10px]">
    <n-back-top right="20" bottom="50" />
    <transition name="fade">
      <full-screen-loading v-show="appStore.fullScreenLoading" />
    </transition>
    <router-view v-slot="{ Component, route }">
      <page-transition :name="transitionName">
        <keep-alive :include="tabBarStore.cacheMenus as string[]">
          <component
            :is="Component"
            v-if="tabBarStore.refreshFlag"
            :key="route.fullPath"
          />
        </keep-alive>
      </page-transition>
    </router-view>
  </n-layout-content>
</template>

<style lang="scss">
.layout-main {
  flex: 1;
  flex-shrink: 0;
  padding: 0 10px 5px 10px;
  position: relative;
}
</style>
