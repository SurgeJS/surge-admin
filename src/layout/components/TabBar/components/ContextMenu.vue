<script setup lang="ts">
import { computed } from 'vue'
import useTabBarStore from '@/store/modules/tabBar'
import { useRoute } from 'vue-router'
import useRenderIcon from '@/hooks/components/useRenderIcon'
import { PopoverTrigger } from 'naive-ui'
import { Tab } from '@/store/modules/tabBar/type'

export interface ContextMenuProps {
  trigger?: PopoverTrigger

  tab?: Tab

  x?: number

  y?: number
}

const props = defineProps<ContextMenuProps>()

const visible = defineModel<boolean>('visible')

const tabBarStore = useTabBarStore()
const route = useRoute()
const { RenderUnoIcon } = useRenderIcon()

const tab = computed(() => props.tab || route)

const contextMenu = computed(() => {
  return [
    {
      icon: () => RenderUnoIcon('i-ant-design:reload-outlined'),
      key: 'reload',
      label: '刷新',
      disabled: route.path !== tab.value.path
    },
    {
      icon: () => RenderUnoIcon('i-ant-design:close-outlined'),
      key: 'close',
      label: '关闭',
      disabled: Boolean(tab.value.meta?.affixTab)
    },
    {
      icon: () => RenderUnoIcon('i-ant-design:vertical-right-outlined'),
      key: 'closeLeft',
      label: '关闭左边',
      disabled: (() => {
        const index = tabBarStore.getIndex(tab.value.path)
        if (index === 0 || index === -1) return true
        return !tabBarStore.tabs.slice(0, index).some(item => !item.meta?.affixTab)
      })()
    },
    {
      icon: () => RenderUnoIcon('i-ant-design:vertical-left-outlined'),
      key: 'closeRight',
      label: '关闭右边',
      disabled: (() => {
        const index = tabBarStore.getIndex(tab.value.path)
        if (index === tabBarStore.tabs.length - 1 || index === -1) return true
        return !tabBarStore.tabs.slice(index).some(item => !item.meta?.affixTab)
      })()
    },
    {
      icon: () => RenderUnoIcon('i-ant-design:arrows-alt-outlined'),
      key: 'closeOther',
      label: '关闭其他',
      disabled: !tabBarStore.tabs.some(item => item.path !== tab.value.path && !tab.value.meta?.affixTab)
    },
    {
      icon: () => RenderUnoIcon('i-ant-design:minus-outlined'),
      key: 'closeAll',
      label: '关闭全部',
      disabled: !tabBarStore.tabs.some(item => !item.meta?.affixTab),
    }
  ]
})

const handleSelect = (key: string) => {
  switch (key) {
    case 'reload':
      tabBarStore.refresh()
      break
    case 'close':
      tabBarStore.closeTab(props.tab || tabBarStore.tabs[tabBarStore.getIndex(route.path)])
      break
    case 'closeLeft':
      tabBarStore.closeLeft(tab.value.path)
      break
    case 'closeRight':
      tabBarStore.closeRight(tab.value.path)
      break
    case 'closeOther':
      tabBarStore.closeOther(tab.value.path)
      break
    case 'closeAll':
      tabBarStore.closeAll()
      break
  }
}
const onClickOutside = () => {
  visible.value = false
}
</script>

<template>
  <n-dropdown
    v-model:show="visible"
    placement="bottom-start"
    :trigger="trigger"
    :x="x"
    :y="y"
    :options="contextMenu"
    :on-clickoutside="onClickOutside"
    @select="handleSelect"
  >
    <slot />
  </n-dropdown>
</template>

<style scoped lang="scss">

</style>
