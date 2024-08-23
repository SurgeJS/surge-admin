import { defineStore } from 'pinia'
import { appStore } from '@/store/modules/app/initial'
import { ComputedRef, nextTick } from 'vue'
import { GlobalToken } from 'ant-design-vue/es/theme/interface'
import { setCSSVariable, temporaryClearTransition } from '@/utils'
import AppConstant from '@/constant/app'
import { theme } from 'ant-design-vue'
import { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { AppStore, ThemeMode } from '@/store/modules/app/type'

const useAppStore = defineStore('App', {
    state: (): AppStore => appStore,
    getters: {
        // 动态侧边栏宽度
        dynamicSidebarWidth: ({ sidebar }) => sidebar.isCollapsed ?
            sidebar.collapsedSidebarWidth :
            sidebar.sidebarWidth,
        // 动态混合侧边栏宽度
        dynamicMixSidebarWidth: ({ sidebar }) => sidebar.isCollapsedMix ?
            sidebar.collapsedSidebarWidth :
            sidebar.mixSidebarWidth,
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
        // antd 组件库主题配置
        themeConfig: ({ base }): ThemeConfig => {
            const antdTheme = base.themeMode === 'dark' ? AppConstant.DARK_THEME : AppConstant.LIGHT_THEME
            return {
                token: { colorPrimary: base.themeColor, ...antdTheme },
                algorithm: base.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
            }
        }
    },
    actions: {
        // 获取系统主题
        getSystemThemeMode(): ThemeMode {
            const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
            return themeMedia.matches ? 'light' : 'dark'
        },

        // 设置主题模式
        setThemeMode(mode: ThemeMode) {
            // 临时清除过渡效果
            temporaryClearTransition(() => {
                this.base.themeMode = mode
            })
        },

        // 设置主题颜色
        setThemeColor(color: string) {
            this.base.themeColor = color
        },

        // 映射Antd主题到Css变量
        mapAntdThemeToCSSVariable(token: ComputedRef<GlobalToken>) {
            void nextTick(() => {
                const themeVariable = AppConstant.ANTD_THEME_KEY.reduce((initialThemeVariable, key) => {
                    initialThemeVariable[key] = token.value[key]
                    return initialThemeVariable
                }, {})
                const antdTheme = this.base.themeMode === 'dark' ? AppConstant.DARK_THEME : AppConstant.LIGHT_THEME
                setCSSVariable({
                    ...themeVariable,
                    ...antdTheme,
                    ...AppConstant.NEUTER_THEME
                })
            })
        },

        systemThemeChange() {
            this.setThemeMode(this.getSystemThemeMode())
        },

        // 监听系统主题变化
        onSystemThemeChange() {
            const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
            // 监听主题变更
            matchMedia.addEventListener('change', this.systemThemeChange)
        },

        // 删除监听系统主题变化
        removeSystemThemeChange() {
            const matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
            // 监听主题变更
            matchMedia.removeEventListener('change', this.systemThemeChange)
        },

        // 切换Sidebar折叠
        toggleSidebarCollapsed(isCollapsed?: boolean) {
            this.sidebar.isCollapsed = isCollapsed !== undefined ? isCollapsed : !this.sidebar.isCollapsed
        },

        // 切换移动端Sidebar可见
        toggleMobileSidebarVisible(isVisible?: boolean) {
            this.sidebar.mobileSidebarVisible = isVisible !== undefined ? isVisible : !this.sidebar.mobileSidebarVisible
        },

        // 切换混合Sidebar折叠
        toggleMixSidebarCollapsed(isCollapsed?: boolean) {
            this.sidebar.isCollapsedMix = isCollapsed !== undefined ? isCollapsed : !this.sidebar.isCollapsedMix
        },

        // 切换混合SidebarDrawer可见
        toggleMixSidebarDrawerVisible(isVisible?: boolean) {
            this.sidebar.mixSidebarDrawerVisible = isVisible !== undefined ?
                isVisible :
                !this.sidebar.mixSidebarDrawerVisible
        },

        // 切换混合SidebarDrawer可见
        toggleFixedMixSidebarDrawer(isFixedMix?: boolean) {
            this.sidebar.isFixedMixSidebarDrawer = isFixedMix !== undefined ?
                isFixedMix :
                !this.sidebar.isFixedMixSidebarDrawer
        },

        setFullScreenLoading(isShow?: boolean) {
            this.base.fullScreenLoading = isShow !== undefined ? isShow : !this.base.fullScreenLoading
        },
    }
})
export default useAppStore
