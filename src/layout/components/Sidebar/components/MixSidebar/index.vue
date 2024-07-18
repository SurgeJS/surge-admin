<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { computed, ref, watch } from 'vue'
import useAuthStore from '@/store/modules/auth'
import { useRoute, useRouter } from 'vue-router'
import Logo from '@/layout/components/Logo.vue'
import MixSidebarDrawers from '@/layout/components/Sidebar/components/MixSidebar/components/MixSidebarDrawers.vue'

defineOptions({ name: 'MixSidebar' })

const appStore = useAppStore()
const { footer, sidebar } = appStore
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const menus = ref<AppRouteRecordRaw[]>([])
const temporaryActivePath = ref<Nullable<string>>()

const collapsedIcon = computed(() => sidebar.isCollapsedMix ?
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
    if (!sidebar.isFixedMixSidebarDrawer) sidebar.mixSidebarDrawerVisible = false
    menus.value = []
  }
}

const isActive = (path: string) => {
  if (temporaryActivePath.value) return temporaryActivePath.value === path ? 'active' : undefined
  return route.matched.some(item => item.path === path) ? 'active' : undefined
}

const onMouseLeave = () => {
  !sidebar.isFixedMixSidebarDrawer && appStore.toggleMixSidebarDrawerVisible(false)
  temporaryActivePath.value = null
  menus.value = getPathRoot(route.path)?.children || []
}

watch(() => route.path, () => {
  menus.value = getPathRoot(route.path)?.children || []
}, { immediate: true })
</script>

<template>
  <div
    :class="appStore.dynamicSidebarDark.className"
    :style="{width:`${appStore.dynamicMixSidebarWidth}px`}"
    class="mixSidebar"
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
          :size="sidebar.isCollapsedMix ? 20: 24"
          pointer
        />
        <p v-if="!sidebar.isCollapsedMix" class="mixSidebar-container-menu-text">
          {{ item?.meta?.title }}
        </p>
      </div>
    </div>
    <div
      :style="{height:`${footer.height}px`}"
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
  border-right: 1px solid theme('borderColor.secondary');
  padding: 7px;
  position: relative;
  transition: width .2s ease-in-out;

  &.dark {
    border-right: 1px solid theme('borderColor.dark');

    .mixSidebar-container-menu {
      &:hover:not(.active) {
        background: theme('colors.fill-dark');
      }
    }

    .mixSidebar-footer {
      &:hover {
        background: theme('colors.fill-dark');
      }
    }
  }

  &-container {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 7px;

    &-menu {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px 7px;
      gap: 7px;
      transition: .2s;
      border-radius: theme('borderRadius.md');
      cursor: pointer;
      font-size: 12px;

      :deep(svg) {
        transition: width, height .2s ease-in-out;
      }

      &:hover:not(.active) {
        background: theme('colors.fill-tertiary');
      }

      &.active {
        background: theme('colors.primary');
        color: white;
      }

      &-text {
        white-space: nowrap;
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
      background: theme('colors.fill-quaternary');
    }
  }
}
</style>
