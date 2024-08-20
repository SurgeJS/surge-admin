import { cloneDeep } from 'lodash-es'
import { appCache } from '@/store/caches'
import { AppStore } from '@/store/modules/app/type'

// 移动端处罚宽度
const mobileTriggerWidth = 800

// 初始设置
export const initialAppStore: AppStore = {
    base: {
        // 主题颜色
        themeColor: '#6675ff',

        // 主题模式是否跟随系统
        themeModeFollowSystem: true,

        // 主题模式
        themeMode: 'light',

        // 是否开启页面切换动画
        isPageStartAnimation: true,

        // 页面动画
        pageAnimationMode: 'zoom-fade',

        // 布局模式
        layoutMode: 'side',

        // 布局风格
        layoutStyle: 'side-dark',

        // 移动端触发宽度
        mobileTriggerWidth: 800,

        // 是否移动端
        isMobile: document.body.offsetWidth <= mobileTriggerWidth,

        // 全屏loading
        fullScreenLoading: false
    },
    antdConfig: {
        size: 'middle',
        autoInsertSpaceInButton: true
    },
    sidebar: {
        // 是否折叠侧边栏
        isCollapsed: false,

        // 是否折叠混合侧边栏
        isCollapsedMix: false,

        // 是否固定混合侧边栏
        isFixedMixSidebarDrawer: false,

        // 混合侧边栏抽屉是否可见
        mixSidebarDrawerVisible: false,

        // 菜单是否开启手风琴模式
        isMenuAccordion: true,

        // 移动端 menu 可见
        mobileSidebarVisible: false,

        // 侧边栏宽度
        sidebarWidth: 220,

        // 混合侧边栏宽度
        mixSidebarWidth: 94,

        // 折叠侧边栏的宽度
        collapsedSidebarWidth: 56
    },
    header: {
        // 是否开启面包屑
        breadcrumbVisible: true,

        // 标签栏可见
        tabBarVisible: true,

        // 头部高度
        headerHeight: 56,

        // 标签栏高度
        tabBarHeight: 44
    },
    footer: {
        // 底部可见
        visible: true,

        height: 40
    }
}

export const appStore = appCache.get() || cloneDeep(initialAppStore)

