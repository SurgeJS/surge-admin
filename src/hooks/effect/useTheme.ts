import { darkTheme, GlobalThemeOverrides, lightTheme, useOsTheme } from 'naive-ui'
import useAppStore from '@/store/modules/app'
import { temporaryClearTransition } from '@/utils'
import AppConstant from '@/constant/app'
import { generate } from '@ant-design/colors'
import { omit } from 'lodash-es'

const useTheme = () => {
    const osTheme = useOsTheme()
    const appStore = useAppStore()
    const { base } = appStore

    const themeOverrides = ref<GlobalThemeOverrides>()

    const isDark = computed(() => (base.themeMode === 'system' && osTheme.value === 'dark') || base.themeMode === 'dark')

    const theme = computed(() => isDark.value ? darkTheme : lightTheme)

    // 生成色板
    const generateColorPalette = (color: string) => generate(color, {
        theme: isDark.value ? 'dark' : 'default',
    })

    // 生成主题色色板
    const generatePrimaryColorPalette = (): GlobalThemeOverrides['common'] => {
        const colors = generateColorPalette(base.themeColor)
        return {
            primaryColor: colors[5],
            primaryColorHover: colors[4],
            primaryColorPressed: colors[5],
            primaryColorSuppl: colors[6]
        }
    }

    const generateCommonTheme = (): GlobalThemeOverrides['common'] => {
        const theme = !isDark.value ? AppConstant.LIGHT_THEME : AppConstant.DARK_THEME
        const { backgroundColors, textColors, borderColors } = theme
        return {
            /* 文字颜色 */
            textColor1: textColors?.base,
            textColor2: textColors?.secondary,
            textColor3: textColors?.tertiary,
            textColorDisabled: textColors?.disabled,
            /* 背景颜色 */
            bodyColor: backgroundColors?.layout,
            cardColor: backgroundColors?.container,
            modalColor: backgroundColors?.layer,
            /* 边框颜色 */
            borderColor: borderColors?.base,
        }
    }

    // 适配 naive 组件主题
    const adaptNaiveTheme = () => {
        const overrides = !isDark.value ? AppConstant.NAIVE_COMPONENT_LIGHT_THEME : AppConstant.NAIVE_COMPONENT_DARK_THEME
        themeOverrides.value = {
            common: {
                ...generatePrimaryColorPalette(),
                ...generateCommonTheme(),
                ...overrides.common,
            },
            ...omit(overrides, [ 'common' ])
        }
    }

    // 监听 主题模式 | 主题颜色 | 操作系统主题 变化
    watch([ () => base.themeMode, () => base.themeColor, osTheme ], () => {
        temporaryClearTransition(() => {
            // 适配 naive 组件主题
            adaptNaiveTheme()
        })
    }, { immediate: true })

    return { theme, themeOverrides }
}

export default useTheme