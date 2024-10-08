import { defineStore } from 'pinia'
import { AppStore, ThemeMode } from '@/store/modules/app/type'
import { darkTheme, GlobalThemeOverrides, lightTheme, useOsTheme } from 'naive-ui'
import { appCache } from '@/store/caches'
import { setCSSVariable, temporaryClearTransition, toKebabCase } from '@/utils'
import { generate } from '@ant-design/colors'
import AppConstant from '@/constant/app'
import { cloneDeep, merge } from 'lodash-es'

// 初始APP STORE
export const initialAppStore: AppStore = {
    // 主题颜色
    themeColor: AppConstant.PRIMARY_COLOR,

    // 主题模式
    themeMode: 'system',

    // 是否开启页面切换动画
    isPageStartAnimation: true,

    // 页面动画
    pageAnimationMode: 'zoom-fade',

    // 布局模式
    layoutMode: 'side',

    // 布局风格
    layoutStyle: 'side-dark',

    // 移动端触发宽度
    mobileTriggerWidth: AppConstant.MOBILE_TRIGGER_WIDTH,

    // 是否移动端
    isMobile: document.body.offsetWidth <= AppConstant.MOBILE_TRIGGER_WIDTH,

    // 全屏loading
    fullScreenLoading: false,

    // 是否折叠侧边栏
    isCollapsedSidebar: false,

    // 是否折叠混合侧边栏
    isCollapsedMixSidebar: false,

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
    collapsedSidebarWidth: 56,

    // 是否开启面包屑
    breadcrumbVisible: true,

    // 标签栏可见
    tabBarVisible: true,

    // 头部高度
    headerHeight: 56,

    // 标签栏高度
    tabBarHeight: 44,

    footerVisible: true,

    footerHeight: 40
}

const useAppStore = defineStore('App', () => {
    const osTheme = useOsTheme()

    const appStore = reactive<AppStore>(appCache.get() || cloneDeep(initialAppStore))
    const appStoreRefs = toRefs(appStore)
    const themeOverrides = ref<GlobalThemeOverrides>()

    // 是否暗黑模式
    const isDark = computed(() => (appStore.themeMode === 'system' && osTheme.value === 'dark') || appStore.themeMode === 'dark')
    // 是否明亮模式
    const isLight = computed(() => !isDark.value)
    // 是否反转侧边栏
    const isInvertedSidebar = computed(() => (appStore.layoutStyle === 'side-dark' || appStore.layoutStyle === 'side-top-dark') && isLight.value)
    // 是否反转头部
    const isInvertedHeader = computed(() => appStore.layoutStyle === 'side-top-dark' && isLight.value)
    // 动态侧边栏宽度
    const dynamicSidebarWidth = computed(() => appStore.isCollapsedSidebar ? appStore.collapsedSidebarWidth : appStore.sidebarWidth)
    // 动态混合侧边栏宽度
    const dynamicMixSidebarWidth = computed(() => appStore.isCollapsedMixSidebar ? appStore.collapsedSidebarWidth : appStore.mixSidebarWidth)
    // naive主题
    const naiveTheme = computed(() => isDark.value ? darkTheme : lightTheme)

    // 设置主题颜色
    const setThemeColor = (color: string) => {
        appStore.themeColor = color
    }

    // 切换Sidebar折叠
    const toggleSidebarCollapsed = (isCollapsed?: boolean) => {
        appStore.isCollapsedSidebar = isCollapsed ?? !appStore.isCollapsedSidebar
    }

    // 切换移动端Sidebar可见
    const toggleMobileSidebarVisible = (isVisible?: boolean) => {
        appStore.mobileSidebarVisible = isVisible ?? !appStore.mobileSidebarVisible
    }

    // 切换混合Sidebar折叠
    const toggleMixSidebarCollapsed = (isCollapsed?: boolean) => {
        appStore.isCollapsedMixSidebar = isCollapsed ?? !appStore.isCollapsedMixSidebar
    }

    // 切换混合SidebarDrawer可见
    const toggleMixSidebarDrawerVisible = (isVisible?: boolean) => {
        appStore.mixSidebarDrawerVisible = isVisible ?? !appStore.mixSidebarDrawerVisible
    }

    // 切换混合SidebarDrawer可见
    const toggleFixedMixSidebarDrawer = (isFixedMix?: boolean) => {
        appStore.isFixedMixSidebarDrawer = isFixedMix ?? !appStore.isFixedMixSidebarDrawer
    }

    const setFullScreenLoading = (isShow?: boolean) => {
        appStore.fullScreenLoading = isShow ?? !appStore.fullScreenLoading
    }

    const updateMobile = () => {
        appStore.isMobile = document.body.offsetWidth <= appStore.mobileTriggerWidth
    }

    // 切换主题模式
    const toggleThemeMode = (mode?:ThemeMode) => {
        if (mode) {
            appStore.themeMode = mode
        } else {
            switch (appStore.themeMode) {
                case 'light':
                    appStore.themeMode = 'dark'
                    break
                case 'dark':
                    appStore.themeMode = 'system'
                    break
                case 'system':
                    appStore.themeMode = 'light'
            }
        }
    }

    // 生成色板
    const generateColorPalette = (color: string) => generate(color, {
        theme: isDark.value ? 'dark' : 'default',
    })

    // 生成主题css变量
    const generateThemeCSSVariables = (theme: Theme) => {
        Object.keys(theme).forEach(key => {
            const variable = Object.keys(theme[key]).reduce((obj, item) => {
                obj[`${ toKebabCase(key) }-${ item }`] = theme[key][item]
                return obj
            }, {})
            setCSSVariable(variable)
        })
    }

    // 生成色板CSS变量
    const generatePaletteCSSVariables = (name: string, colors: string[]) => {
        const variable = colors.reduce((obj, item, i) => {
            obj[`${ name }-${ i }`] = item
            return obj
        }, {})
        setCSSVariable(variable)
    }

    // 更新主题
    const updateTheme = () => {
        // 自定义 naive 组件主题
        const customizeOverrides = !isDark.value ? AppConstant.NAIVE_COMPONENT_LIGHT_THEME : AppConstant.NAIVE_COMPONENT_DARK_THEME
        // 自定义主题
        const theme = isDark.value ? AppConstant.DARK_THEME : AppConstant.LIGHT_THEME
        // 生成主题色色板
        const colors = generateColorPalette(appStore.themeColor)

        // 生成主题色CSS变量
        generatePaletteCSSVariables('primary', colors)

        // 生成主题CSS变量
        generateThemeCSSVariables(theme)

        const { backgroundColor, textColor, borderColor, borderRadius } = theme

        const naiveThemeOverride: GlobalThemeOverrides = {
            common: {
                /* 主题色 */
                primaryColor: colors[5],
                primaryColorHover: colors[4],
                primaryColorPressed: colors[5],
                primaryColorSuppl: colors[6],
                /* 文字颜色 */
                textColor1: textColor?.base,
                textColor2: textColor?.secondary,
                textColor3: textColor?.tertiary,
                textColorDisabled: textColor?.disabled,
                /* 背景颜色 */
                bodyColor: backgroundColor?.layout,
                cardColor: backgroundColor?.container,
                modalColor: backgroundColor?.layer,
                invertedColor: backgroundColor?.inverted,
                popoverColor: backgroundColor?.layer,
                /* 边框颜色 */
                borderColor: borderColor?.base,
                /* 边框圆角 */
                borderRadius: borderRadius?.md,
                borderRadiusSmall: borderRadius?.sm
            },
            Layout: {
                textColorInverted: textColor?.inverted,
                siderBorderColorInverted: borderColor?.inverted,
                headerBorderColorInverted: borderColor?.inverted,
            },
            Button: {
                textColorPrimary: 'rgba(255, 255, 255, .9)',
                textColorHoverPrimary: 'rgba(255, 255, 255, .9)',
                textColorPressedPrimary: 'rgba(255, 255, 255, .9)',
                textColorFocusPrimary: 'rgba(255, 255, 255, .9)',
                textColorDisabledPrimary: 'rgba(255, 255, 255, .9)',
            }
        }

        themeOverrides.value = merge(naiveThemeOverride, customizeOverrides)
    }

    // 监听 主题模式 | 主题颜色 | 操作系统主题 变化
    watch([ () => appStore.themeMode, () => appStore.themeColor, osTheme ], () => {
        // 临时清除全局的过渡效果
        temporaryClearTransition(updateTheme)
    }, { immediate: true })

    return {
        ...appStoreRefs,
        isDark,
        isLight,
        isInvertedSidebar,
        isInvertedHeader,
        dynamicSidebarWidth,
        dynamicMixSidebarWidth,
        naiveTheme,
        themeOverrides,
        setThemeColor,
        toggleThemeMode,
        toggleSidebarCollapsed,
        toggleMobileSidebarVisible,
        toggleMixSidebarCollapsed,
        toggleMixSidebarDrawerVisible,
        toggleFixedMixSidebarDrawer,
        setFullScreenLoading,
        updateMobile
    }
})

export default useAppStore
