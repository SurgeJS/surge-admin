<script setup lang="ts">
import useRenderIcon from '@/hooks/components/useRenderIcon'
import useAppStore from '@/store/modules/app'
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import { MenuProps } from '@/layouts/components/Menu/type/props'
import useOmitProps from '@/hooks/common/useOmitProps'

const props = defineProps<MenuProps>()

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const { RenderDynamicIcon } = useRenderIcon()
const menuProps = useOmitProps(props,[ 'routes' ])
const menus = computed(() => routesToMenus(props.routes))

const routesToMenus = (routes: AppRouteRecordRaw[]): MenuMixedOption[] => {
  return routes.reduce<MenuMixedOption[]>((menuList, item) => {
    if (item.meta?.hideMenu) return menuList
    menuList.push({
      key: item.path,
      icon: item.meta?.icon ? () => RenderDynamicIcon(item.meta?.icon as string) : undefined,
      label: item.meta?.title,
      show: item.meta?.hideMenu,
      disabled: item.meta?.disabledMenu,
      children: item.children?.length ? routesToMenus(item.children) : undefined
    })
    return menuList
  }, [])
}

const onClick = (key) => {
  router.push(key)
}

</script>

<template>
  <n-menu
    :value="route.path"
    :options="menus"
    :accordion="appStore.sidebar.isMenuAccordion"
    v-bind="menuProps"
    class="w-full"
    @update:value="onClick"
  />
</template>

<style scoped lang="scss">

</style>