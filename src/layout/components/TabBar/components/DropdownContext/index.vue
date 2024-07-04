<script setup lang="ts">
import { computed } from "vue";
import useTabBarStore from "@/store/modules/tabBar";
import { useRoute } from "vue-router";
import type { DropdownContextProps } from "@/layout/components/TabBar/components/DropdownContext/type";

const props = defineProps<DropdownContextProps>();

const tabBarStore = useTabBarStore()
const route = useRoute()

const tab = computed(() => props.tab || route)

const dropdownList = computed(() => {
  return [
    {
      icon: 'i-ant-design:reload-outlined',
      title: '刷新',
      disabled: () => route.path !== tab.value.path,
      handle() {
        tabBarStore.refreshCurrent()
      }
    },
    {
      icon: 'i-ant-design:close-outlined',
      title: '关闭',
      disabled: () => Boolean(tab.value.meta?.affix),
      handle() {
        tabBarStore.closeTab(props.tab || tabBarStore.tabs[tabBarStore.getIndex(route.path)])
      }
    },
    {
      icon: 'i-ant-design:vertical-right-outlined',
      title: '关闭左边',
      disabled: () => {
        const index = tabBarStore.getIndex(tab.value.path)
        if (index === 0 || index === -1) return true
        return !tabBarStore.tabs.slice(0, index).some(item => !item.meta?.affix)
      },
      handle() {
        tabBarStore.closeLeft(tab.value.path)
      }
    },
    {
      icon: 'i-ant-design:vertical-left-outlined',
      title: '关闭右边',
      disabled: () => {
        const index = tabBarStore.getIndex(tab.value.path)
        if (index === tabBarStore.tabs.length - 1 || index === -1) return true
        return !tabBarStore.tabs.slice(index).some(item => !item.meta?.affix)
      },
      handle() {
        tabBarStore.closeRight(tab.value.path)
      }
    },
    {
      icon: 'i-ant-design:arrows-alt-outlined',
      title: '关闭其他',
      disabled: () => {
        return !tabBarStore.tabs.some(item => item.path !== tab.value.path && !tab.value.meta?.affix)
      },
      handle() {
        tabBarStore.closeOther(tab.value.path)
      }
    },
    {
      icon: 'i-ant-design:minus-outlined',
      title: '关闭全部',
      disabled: () => !tabBarStore.tabs.some(item => !item.meta?.affix),
      handle() {
        tabBarStore.closeAll()
      }
    }
  ]
});

</script>

<template>
  <a-dropdown :trigger="trigger">
    <slot></slot>
    <template #overlay>
      <a-menu>
        <a-menu-item
            v-for="item in dropdownList"
            :key="item.title"
            :disabled="item.disabled()"
            @click="item.handle"
        >
          <template #icon>
            <icon :icon="item.icon"/>
          </template>
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="scss">

</style>