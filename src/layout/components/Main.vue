<script lang="ts" setup>
import useTabBarStore from '@/store/modules/tabBar'
import useAppStore from '@/store/modules/app'
import { startCase } from 'lodash-es'
import { computed } from 'vue'

const tabBarStore = useTabBarStore()
const appStore = useAppStore()
const { base } = appStore
// 缓存菜单，转成大驼峰
const cacheMenus = computed(() => tabBarStore.cacheMenus.map((name) => startCase(name).replace(' ', '')))
const transitionName = computed(() => base.isPageStartAnimation ? base.pageAnimationMode : undefined)
</script>

<template>
  <div class="layout-main">
    <router-view
        v-if="tabBarStore.mainVisible"
        v-slot="{ Component, route }"
    >
      <transition :name="transitionName" appear mode="out-in">
        <keep-alive :include="cacheMenus">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.layout-main {
  flex: 1;
  padding: 0 10px 5px 10px;
  position: relative;
  height: 100%;
  flex-shrink: 0;
  overflow: auto;
}
</style>
