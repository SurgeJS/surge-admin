<script setup lang="ts">
import { MenuProps } from '@/layout/components/Menu/type/props'
import useRenderIcon from '@/hooks/components/useRenderIcon'
import useAppStore from '@/store/modules/app'
import { useToggle } from '@vueuse/core'

const props = withDefaults(defineProps<MenuProps>(),{
  mode: 'inline'
})

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const [ isInternal,setInternal ] = useToggle()
const { RenderDynamicIcon } = useRenderIcon()

const openKeys = ref<string[]>([])
const levelKeys = computed<Record<string,number>>(() => {
  return getLevelKeys(props.routes)
})

const selectedKeys = computed(() => [ route.path ])
const theme = computed(() => props.dark ? 'dark' : 'light')
const menus = computed(() => routesToMenus(props.routes))

const routesToMenus = (routes: AppRouteRecordRaw[]) => {
  return routes.map(item => {
    return {
      key: item.path,
      icon: item.meta?.icon ? () => RenderDynamicIcon(item.meta?.icon as string) : undefined,
      label: item.meta?.title,
      title: item.meta?.title,
      children: item.children && item.children.length && routesToMenus(item.children)
    }
  })
}

const getLevelKeys = (menus: AppRouteRecordRaw[]) => {
  const keys: Record<string,number> = {}
  const setKeys = (menus: AppRouteRecordRaw[],level = 1) => {
    menus.forEach(item => {
      keys[item.path] = level
      item.children && item.children.length && setKeys(item.children,level + 1)
    })
  }
  setKeys(menus)
  return keys
}

const getParentKeys = (path: string,menus: AppRouteRecordRaw[]) => {
  const keys: string[] = []
  const handle = (menus: AppRouteRecordRaw[]) => {
    return menus.some((item) => {
      if (item.path === path) return true
      if (item.children?.length) {
        const isExists = handle(item.children)
        if (isExists) {
          keys.push(item.path)
          return true
        }
      }
    },[])
  }
  handle(menus)
  return keys.reverse()
}

const onOpenChange = (keys: string[]) => {
  if (appStore.base.layoutMode === 'top' || appStore.sidebar.isCollapsed) return
  if (!appStore.sidebar.isMenuAccordion) {
    openKeys.value = keys
    return
  }
  const currentOpenKey = keys.find((key) => !openKeys.value.includes(key))
  if (currentOpenKey !== undefined) {
    // 重复层级Index
    const repeatLevelIndex = keys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys.value[key] === levelKeys.value[currentOpenKey])
    openKeys.value = keys
        .filter((value,index) => index !== repeatLevelIndex)
        .filter((key) => levelKeys.value[key] <= levelKeys.value[currentOpenKey])
  } else {
    openKeys.value = keys
  }
}

const onClick = ({ key }) => {
  setInternal(true)
  router.push(key).then(() => {
    setInternal(false)
    appStore.base.isMobile && appStore.toggleMobileSidebarVisible(false)
  })
}
// 路由切换的时候设置open key
watch(() => route.path,() => {
  if (isInternal.value || appStore.base.layoutMode === 'top' || appStore.sidebar.isCollapsed) return
  const pKeys = getParentKeys(route.path,props.routes)
  if (!appStore.sidebar.isMenuAccordion) {
    openKeys.value = Array.from(new Set([ ...openKeys.value,...pKeys ]))
  } else {
    openKeys.value = pKeys
  }
},{ immediate: true })
</script>

<template>
  <a-menu
    class="menu"
    :items="menus"
    :theme="theme"
    :mode="mode"
    :inline-collapsed="inlineCollapsed"
    :selected-keys="selectedKeys"
    :open-keys="openKeys"
    @open-change="onOpenChange"
    @click="onClick"
  />
</template>

<style scoped lang="scss">
:global(.ant-menu-horizontal >.ant-menu-submenu), :global(.ant-menu-horizontal >.ant-menu-item) {
  display: inline-flex;
  align-items: center;
}

:global(.ant-menu-dark) {
  background: theme('backgroundColor.dark');
}
</style>