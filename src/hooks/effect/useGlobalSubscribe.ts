import { useEventListener } from '@vueuse/core'
import useAppStore from '@/store/modules/app'
import { appCache } from '@/store/caches'
import { useOsTheme } from 'naive-ui'

// 全局订阅(包含事件、监听器)
export const useGlobalSubscribe = () => {
    const appStore = useAppStore()
    const osTheme = useOsTheme()

    // 监听窗口关闭
    useEventListener(window, 'unload', () => {
        // 储存 AppConfig
        appCache.set(appStore.$state)
    })

    // 监听窗口大小变化
    useEventListener(window, 'resize', () => {
        // 判断是否是移动端
        appStore.updateMobile()
    })

    // 监听操作系统主题变化
    watch(osTheme, () => {
        if (appStore.themeModeFollowingSystem) appStore.toggleThemeMode(osTheme.value as ThemeMode)
    })
}
