<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { computed,nextTick,ref,watch } from 'vue'
import useTabBarStore from '@/store/modules/tabBar'
import { useRoute,useRouter } from 'vue-router'
import { useDebounceFn,useEventListener,useToggle } from '@vueuse/core'

defineOptions({ name: 'TabBar' })

const appStore = useAppStore()
const { header } = appStore
const tabBarStore = useTabBarStore()
const route = useRoute()
const router = useRouter()
// 滚动按钮是否可见
const [ scrollBtnVisible,toggleScrollBtnVisible ] = useToggle()

const tabBarContainer = ref<HTMLElement>()

const dropdownList = [
  {
    icon: 'i-ant-design:reload-outlined',
    title: '刷新',
    disabled: computed(() => route.path !== route.path),
    handle() {
      tabBarStore.refreshCurrent()
    }
  },
  {
    icon: 'i-ant-design:close-outlined',
    title: '关闭',
    disabled: computed(() => {
      const tab = tabBarStore.tabs.find(item => item.path === route.path)
      if (!tab) return false
      return Boolean(tab.meta?.affix)
    }),
    handle() {
      tabBarStore.closeTab(tabBarStore.tabs[tabBarStore.getIndex(route.path)])
    }
  },
  {
    icon: 'i-ant-design:vertical-right-outlined',
    title: '关闭左边',
    disabled: computed(() => {
      const index = tabBarStore.getIndex(route.path)
      if (index === 0 || index === -1) return true
      return !tabBarStore.tabs.slice(0,index).some(item => !item.meta?.affix)
    }),
    handle() {
      tabBarStore.closeLeft(route.path)
    }
  },
  {
    icon: 'i-ant-design:vertical-left-outlined',
    title: '关闭右边',
    disabled: computed(() => {
      const index = tabBarStore.getIndex(route.path)
      if (index === tabBarStore.tabs.length - 1 || index === -1) return true
      return !tabBarStore.tabs.slice(index).some(item => !item.meta?.affix)
    }),
    handle() {
      tabBarStore.closeRight(route.path)
    }
  },
  {
    icon: 'i-ant-design:arrows-alt-outlined',
    title: '关闭其他',
    disabled: computed(() => {
      return !tabBarStore.tabs.some(item => item.path !== route.path && !item.meta?.affix)
    }),
    handle() {
      tabBarStore.closeOther(route.path)
    }
  },
  {
    icon: 'i-ant-design:minus-outlined',
    title: '关闭全部',
    disabled: computed(() => !tabBarStore.tabs.some(item => !item.meta?.affix)),
    handle() {
      tabBarStore.closeAll()
    }
  }
]

// 处理滚动按钮是否显示
const handleScrollBtnVisible = async () => {
  await nextTick()
  if (!tabBarContainer.value) return
  toggleScrollBtnVisible(tabBarContainer.value.scrollWidth > tabBarContainer.value.clientWidth)
}

const toScroll = (direction: 'left' | 'right') => {
  const container = tabBarContainer.value
  if (!container) return
  container.scrollTo({
    left: direction === 'right' ?
          container.clientWidth + container.scrollLeft :
          container.scrollLeft - container.clientWidth,
    behavior: 'smooth'
  })
}

// 滚动到激活的位置
const scrollToActive = useDebounceFn(async () => {
  if (!tabBarContainer.value) return
  await nextTick()
  const container = tabBarContainer.value
  const index = tabBarStore.getIndex(route.path)
  const child = container.children[index] as HTMLElement
  container.scrollTo({
    left: child?.offsetLeft,
    behavior: 'smooth'
  })
},300)

useEventListener('resize',() => {
  handleScrollBtnVisible()
})

// 监听路由变化
watch(() => route.path,() => {
  const { meta,name,path,fullPath } = route
  tabBarStore.addTab({ meta,name: name as string,path,fullPath })
  scrollToActive()
},{ immediate: true })

watch(tabBarStore.tabs,() => {
  handleScrollBtnVisible()
},{ immediate: true })

</script>

<template>
  <div
    v-if="header.tabBarVisible"
    :style="{height:`${header.tabBarHeight}px`}"
    class="tabBar"
  >
    <div
      v-if="scrollBtnVisible"
      class="tabBar-item action"
      @click="toScroll('left')"
    >
      <i class="i-ic:baseline-chevron-left" />
    </div>
    <div ref="tabBarContainer" class="tabBar-container">
      <div
        v-for="item in tabBarStore.tabs"
        :key="item.path"
        :class="route.path === item.path ? 'active' : undefined"
        class="tabBar-item"
        @click="router.push(item.fullPath)"
      >
        {{ item.meta?.title }}
        <i
          v-if="!item.meta?.affix"
          class="i-ic:round-close tabBar-item-clear text-xs"
          @click.stop="tabBarStore.closeTab(item)"
        />
      </div>
    </div>
    <div
      v-if="scrollBtnVisible"
      class="tabBar-item action"
      @click="toScroll('right')"
    >
      <i class="i-ic:baseline-chevron-right" />
    </div>
    <a-dropdown trigger="click">
      <div class="tabBar-item action">
        <i class="i-ic:baseline-keyboard-arrow-down" />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in dropdownList"
            :key="item.title"
            :disabled="item.disabled.value"
            @click="item.handle"
          >
            <template #icon>
              <i :class="item.icon" />
            </template>
            {{ item.title }}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tabBar {
  width: 100%;
  background: theme('backgroundColor.layout');
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  transition: height .2s ease-in-out;

  &-item {
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: theme('backgroundColor.container');
    border-radius: theme('borderRadius.md');
    border: 1px solid theme('colors.fill-quaternary');
    user-select: none;
    cursor: pointer;
    height: 30px;
    box-shadow: theme('boxShadow.main');
    flex-shrink: 0;
    color: theme('textColor.main');
    gap: 5px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 10;
    position: relative;

    &.action {
      width: 30px;
      padding: 0;
    }

    &.active {
      color: white;
      background: theme('colors.primary');
      box-shadow: 3px 3px 3px theme('colors.primary-shallow');

      .tabBar-item-clear {
        color: white !important;
      }
    }

    &-clear {
      transition: 0.1s;
      margin-right: -5px;
      color: theme('textColor.tertiary');

      &:hover {
        color: theme('textColor.main');
      }
    }
  }

  &-container {
    flex: 1;
    display: flex;
    gap: 10px;
    overflow: hidden;
    height: 100%;
    align-items: center;
    position: relative;
  }
}
</style>
