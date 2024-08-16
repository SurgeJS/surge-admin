import { useEventListener } from '@vueuse/core'
import useAppStore from '@/store/modules/app'
import { theme } from 'ant-design-vue'
import { watch } from 'vue'
import { appCache } from '@/store/caches'

// 全局订阅(包含事件、监听器)
export const useGlobalSubscribe = () => {
    const appStore = useAppStore()
    const { base } = appStore
    const { token } = theme.useToken()

    // 监听主题模式变化
    watch([ () => base.themeMode,() => base.themeColor ],() => {
        // 获取最新的 Antd Token 映射到 CSS 变量
        appStore.mapAntdThemeToCSSVariable(token)
    },{ immediate: true })

    // 监听系统主题变化
    watch(() => base.themeModeFollowSystem,() => {
        if (base.themeModeFollowSystem) {
            appStore.systemThemeChange()
            appStore.onSystemThemeChange()
        } else {
            appStore.removeSystemThemeChange()
        }
    },{ immediate: true })

    // 监听窗口关闭
    useEventListener(window,'unload',() => {
        // 储存 AppConfig
        appCache.set(appStore.$state)
    })

    // 监听窗口大小变化
    useEventListener(window,'resize',() => {
        // 判断是否是移动端
        base.isMobile = document.body.offsetWidth <= base.mobileTriggerWidth
    })
}
