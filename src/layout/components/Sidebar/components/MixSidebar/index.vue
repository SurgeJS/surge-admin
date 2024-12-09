<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { computed, ref, watch } from 'vue'
import useAuthStore from '@/store/modules/auth'
import { useRoute, useRouter } from 'vue-router'
import Logo from '@/layout/components/Logo.vue'
import MixSidebarDrawers from '@/layout/components/Sidebar/components/MixSidebar/components/MixSidebarDrawers.vue'

defineOptions({ name: 'MixSidebar' })

const appStore = useAppStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const menus = ref<AppRouteRecordRaw[]>([])
const temporaryActivePath = ref<Nullable<string>>()

const collapsedIcon = computed(() => appStore.isCollapsedMixSidebar ?
    'i-ant-design:double-right-outlined' :
    'i-ant-design:double-left-outlined')

// 获取路由的Root
const getPathRoot = (path: string) => {
  const handle = (routes: AppRouteRecordRaw[]) => {
    return routes.find(item => {
      if (item.path === path) return true
      if (item.children?.length) return handle(item.children)
    })
  }
  return handle(authStore.routes)
}

const handleMixMenuItem = (submenu: AppRouteRecordRaw) => {
  temporaryActivePath.value = submenu.path
  if (submenu.children?.length) {
    menus.value = submenu.children
    appStore.toggleMixSidebarDrawerVisible(true)
  } else {
    router.push(submenu.path)
    if (!appStore.isFixedMixSidebarDrawer) appStore.toggleMixSidebarDrawerVisible(false)
    menus.value = []
  }
}

const isActive = (path: string) => {
  if (temporaryActivePath.value) return temporaryActivePath.value === path ? 'active' : undefined
  return route.matched.some(item => item.path === path) ? 'active' : undefined
}

const onMouseLeave = () => {
  !appStore.isFixedMixSidebarDrawer && appStore.toggleMixSidebarDrawerVisible(false)
  temporaryActivePath.value = null
  menus.value = getPathRoot(route.path)?.children || []
}

watch(() => route.path, () => {
  menus.value = getPathRoot(route.path)?.children || []
}, { immediate: true })
</script>

<template>
  <div
    :style="{width:`${appStore.dynamicMixSidebarWidth}px`}"
    class="mixSidebar"
    :class="{inverted:appStore.isInvertedSidebar}"
    @mouseleave="onMouseLeave"
  >
    <logo />
    <div class="mixSidebar-container">
      <div
        v-for="(item) in authStore.routes"
        :key="item.path"
        :class="isActive(item.path)"
        class="mixSidebar-container-menu"
        @click="handleMixMenuItem(item)"
      >
        <iconify-icon
          :icon="item?.meta?.icon"
          :size="appStore.isCollapsedMixSidebar ? 20: 24"
          pointer
        />
        <n-collapse-transition class="text-center" :show="!appStore.isCollapsedMixSidebar">
          <n-ellipsis>
            {{ item?.meta?.title }}
          </n-ellipsis>
        </n-collapse-transition>
      </div>
    </div>
    <div
      :style="{height:`${appStore.footerHeight}px`}"
      class="mixSidebar-footer"
      @click="()=>appStore.toggleMixSidebarCollapsed()"
    >
      <icon :icon="collapsedIcon" />
    </div>
    <mix-sidebar-drawers :menus="menus" />
  </div>
</template>

<style lang="scss" scoped>
.mixSidebar {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: width .2s ease-in-out;

  &-container {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 7px;

    &-menu {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px 7px;
      transition: .2s;
      border-radius: theme('borderRadius.md');
      cursor: pointer;
      font-size: 12px;

      :deep(svg) {
        transition: width, height .2s ease-in-out;
      }

      &:hover:not(.active) {
        background: theme('colors.fill.tertiary');
      }

      &.active {
        background: theme('colors.primary');
        color: white;
      }
    }
  }

  &-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: theme('borderRadius.md');

    &:hover {
      background: theme('colors.fill.tertiary');
    }
  }

  &.inverted {
    border-right: 1px solid theme('borderColor.inverted');

    .mixSidebar-container-menu {
      &:hover:not(.active) {
        background: theme('colors.fill.inverted');
      }
    }
  }

}
</style>
