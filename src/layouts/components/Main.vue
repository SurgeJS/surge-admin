<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import useAppStore from '@/store/modules/app'
import { computed, ref } from 'vue'
import FullScreenLoading from '@/layouts/components/FullScreenLoading.vue'
import PageTransition from '@/layouts/components/PageTransition.vue'

const tabBarStore = useTabBarStore()
const appStore = useAppStore()
const { base } = appStore

const scrollContainer = ref<HTMLDivElement>()

const transitionName = computed(() => base.isPageStartAnimation ? base.pageAnimationMode : undefined)
</script>

<template>
  <div class="layout-main">
    <full-screen-loading v-show="base.fullScreenLoading" />
    <div
      v-show="!base.fullScreenLoading"
      ref="scrollContainer"
      class="layout-main-container"
    >
      <!-- 返回顶部 -->
      <a-back-top :target="()=>scrollContainer as HTMLDivElement" />
      <router-view v-slot="{ Component, route }">
        <page-transition :name="transitionName">
          <keep-alive :include="tabBarStore.cacheMenus">
            <component
              :is="Component"
              v-if="tabBarStore.refreshFlag"
              :key="route.fullPath"
            />
          </keep-alive>
        </page-transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-main {
  flex: 1;
  position: relative;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;

  &-container {
    width: 100%;
    height: 100%;
    padding: 0 10px 5px 10px;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
