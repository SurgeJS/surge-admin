<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import useAppStore from '@/store/modules/app'
import { startCase } from 'lodash-es'
import { computed, ref } from 'vue'
import FullScreenLoading from '@/layout/components/FullScreenLoading.vue'

const tabBarStore = useTabBarStore()
const appStore = useAppStore()
const { base } = appStore

const scrollContainer = ref<HTMLDivElement>()

// 缓存菜单，转成大驼峰
const cacheMenus = computed(() => {
  console.log(tabBarStore.cacheMenus.map((name) => {
    console.log(startCase(name))
    return startCase(name).replace('/', '')
  }))
  return tabBarStore.cacheMenus.map((name) => startCase(name).replace('/', ''))
})
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
        <transition
          :name="transitionName"
          appear
          mode="out-in"
        >
          <keep-alive :include="cacheMenus">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
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
