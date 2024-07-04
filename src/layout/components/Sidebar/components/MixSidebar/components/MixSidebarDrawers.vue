<script lang="ts" setup>
import Menu from '@/layout/components/Menu/index.vue'

import useAppStore from '@/store/modules/app'
import { computed, nextTick } from 'vue'

interface Props {
  menus: AppRouteRecordRaw[]
}

defineProps<Props>()

const appStore = useAppStore()
const { sidebar, header } = appStore

const thumbtackIcon = computed(() => sidebar.isFixedMixSidebarDrawer
    ? 'i-ant-design:pushpin-filled'
    : 'i-ant-design:pushpin-twotone')

const onBeforeEnter = async (el: HTMLElement) => {
  await nextTick()
  const parentElement = el.parentElement?.parentElement
  if (parentElement) return parentElement.style.overflow = 'visible'
}

const onAfterLeave = async (el: HTMLElement) => {
  await nextTick()
  const parentElement = el.parentElement?.parentElement
  if (parentElement) parentElement.style.overflow = 'hidden'
}

</script>

<template>
  <transition
      name="fold"
      @after-leave="onAfterLeave"
      @before-enter="onBeforeEnter"
  >
    <div
        v-show="sidebar.mixSidebarDrawerVisible"
        :class="appStore.dynamicSidebarDark.className"
        :style="{width:`${sidebar.sidebarWidth}px`}"
        class="mixMenuDrawers"
    >
      <div :style="{height:`${header.headerHeight}px`}" class="mixMenuDrawers-header">
        Simple Admin
        <icon @click="appStore.toggleFixedMixSidebarDrawer()"
              :icon="thumbtackIcon"
              class="mixMenuDrawers-header-fixed text-base"/>

      </div>
      <div :style="{width:`${sidebar.sidebarWidth}px`}" class="mixMenuDrawers-container">
        <Menu :dark="appStore.dynamicSidebarDark.isDark" :routes="menus"/>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.mixMenuDrawers {
  height: 100%;
  position: absolute;
  right: -1px;
  top: 0;
  border-left: 1px solid theme('borderColor.secondary');
  border-right: 1px solid theme('borderColor.secondary');
  transform: translateX(100%);
  z-index: 100;
  overflow: hidden;
  background: theme('backgroundColor.container');
  display: flex;
  flex-direction: column;

  &.dark {
    background: theme('backgroundColor.dark');
    color: theme('textColor.light');
    border-left: 1px solid theme('borderColor.dark');
    border-right: 1px solid theme('borderColor.dark');

    .mixMenuDrawers-header {
      border-bottom: 1px solid theme('borderColor.dark');
    }
  }

  &-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 15px;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 1px solid theme('borderColor.secondary');
    position: relative;
    white-space: nowrap;

    &-fixed {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }
  }

  &-container {
    flex: 1;
    overflow: auto;
  }
}

.slideIn-enter-active,
.slideIn-leave-active {
  transition: 0.2s;
  overflow: hidden;
}

.slideIn-enter-from,
.slideIn-leave-to {
  width: 0 !important;
}
</style>
