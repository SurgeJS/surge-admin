<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import useAppStore from '@/store/modules/app'
import { computed, ref } from 'vue'
import FullScreenLoading from '@/layout/components/FullScreenLoading.vue'
import PageTransition from '@/layout/components/PageTransition.vue'

const tabBarStore = useTabBarStore()
const appStore = useAppStore()
const { base } = appStore

const scrollContainer = ref<HTMLDivElement>()

const transitionName = computed(() => base.isPageStartAnimation ? base.pageAnimationMode : undefined)

const returnScrollContainer = () => {
  return scrollContainer.value as HTMLDivElement
}
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
      <a-back-top :target="returnScrollContainer" />
      <router-view
        v-if="tabBarStore.mainVisible"
        v-slot="{ Component, route }"
      >
        <page-transition :name="transitionName">
          <keep-alive v-if="route.meta.keepAlive">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component
            :is="Component"
            v-else
            :key="route.fullPath"
          />
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
    overflow: auto;
    padding: 0 10px 5px 10px;
  }
}

</style>
