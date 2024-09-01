import { useEventListener } from '@vueuse/core'
import useAppStore from '@/store/modules/app'
import { watch } from 'vue'
import { appCache } from '@/store/caches'
import { useOsTheme, useThemeVars } from 'naive-ui'
import { setCSSVariable } from '@/utils'

// 全局订阅(包含事件、监听器)
export const useGlobalSubscribe = () => {
    const appStore = useAppStore()
    const themeVars = useThemeVars()
    const osTheme = useOsTheme()
    const { base } = appStore

    // 监听主题模式|主题颜色变化
    watch([ () => base.themeMode, () => base.themeColor ], () => {
        setCSSVariable(themeVars.value)
    }, { immediate: true })

    // 监听窗口关闭
    useEventListener(window, 'unload', () => {
        // 储存 AppConfig
        appCache.set(appStore.$state)
    })

    // 监听窗口大小变化
    useEventListener(window, 'resize', () => {
        // 判断是否是移动端
        base.isMobile = document.body.offsetWidth <= base.mobileTriggerWidth
    })
}
