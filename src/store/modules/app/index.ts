import { defineStore } from 'pinia'
import { appStore } from '@/store/modules/app/initial'
import { AppStore } from '@/store/modules/app/type'

const useAppStore = defineStore('App', {
    state: (): AppStore => appStore,
    getters: {
        // 动态侧边栏宽度
        dynamicSidebarWidth: ({ sidebar }) => sidebar.isCollapsed ? sidebar.collapsedSidebarWidth : sidebar.sidebarWidth,
        // 动态混合侧边栏宽度
        dynamicMixSidebarWidth: ({ sidebar }) => sidebar.isCollapsedMix ? sidebar.collapsedSidebarWidth : sidebar.mixSidebarWidth,
        // 动态侧边栏暗黑模式
        dynamicSidebarDark: ({ base }) => (base.layoutStyle === 'side-dark' || base.layoutStyle === 'side-top-dark') && base.themeMode !== 'dark'
            ?
            {
                isDark: true,
                className: 'dark'
            }
            :
            {
                isDark: false,
                className: undefined
            },
        // 动态顶部暗黑模式
        dynamicTopDark: ({ base }) => base.layoutStyle === 'side-top-dark' && base.themeMode !== 'dark' ?
            {
                isDark: true,
                className: 'dark'
            } :
            {
                isDark: false,
                className: undefined
            },
    },
    actions: {
        // 设置主题颜色
        setThemeColor(color: string) {
            this.base.themeColor = color
        },

        // 切换Sidebar折叠
        toggleSidebarCollapsed(isCollapsed?: boolean) {
            this.sidebar.isCollapsed = isCollapsed ?? !this.sidebar.isCollapsed
        },

        // 切换移动端Sidebar可见
        toggleMobileSidebarVisible(isVisible?: boolean) {
            this.sidebar.mobileSidebarVisible = isVisible ?? !this.sidebar.mobileSidebarVisible
        },

        // 切换混合Sidebar折叠
        toggleMixSidebarCollapsed(isCollapsed?: boolean) {
            this.sidebar.isCollapsedMix = isCollapsed ?? !this.sidebar.isCollapsedMix
        },

        // 切换混合SidebarDrawer可见
        toggleMixSidebarDrawerVisible(isVisible?: boolean) {
            this.sidebar.mixSidebarDrawerVisible = isVisible ?? !this.sidebar.mixSidebarDrawerVisible
        },

        // 切换混合SidebarDrawer可见
        toggleFixedMixSidebarDrawer(isFixedMix?: boolean) {
            this.sidebar.isFixedMixSidebarDrawer = isFixedMix ?? !this.sidebar.isFixedMixSidebarDrawer
        },

        setFullScreenLoading(isShow?: boolean) {
            this.base.fullScreenLoading = isShow ?? !this.base.fullScreenLoading
        },
    }
})
export default useAppStore
