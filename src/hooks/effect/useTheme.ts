import { darkTheme, GlobalThemeOverrides, lightTheme, useOsTheme } from 'naive-ui'
import useAppStore from '@/store/modules/app'
import { setCSSVariable, temporaryClearTransition, toKebabCase } from '@/utils'
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

    // 生成主题色色板
    const generatePrimaryColorPalette = (): GlobalThemeOverrides['common'] => {
        const colors = generateColorPalette(base.themeColor)
        generatePaletteCSSVariables('primary', colors)
        return {
            primaryColor: colors[5],
            primaryColorHover: colors[4],
            primaryColorPressed: colors[5],
            primaryColorSuppl: colors[6]
        }
    }

    const generateCommonTheme = (): GlobalThemeOverrides['common'] => {
        const theme = !isDark.value ? AppConstant.LIGHT_THEME : AppConstant.DARK_THEME
        generateThemeCSSVariables(theme)
        const { backgroundColor, textColor, borderColor, borderRadius } = theme
        return {
            /* 文字颜色 */
            textColor1: textColor?.base,
            textColor2: textColor?.secondary,
            textColor3: textColor?.tertiary,
            textColorDisabled: textColor?.disabled,
            /* 背景颜色 */
            bodyColor: backgroundColor?.layout,
            cardColor: backgroundColor?.container,
            modalColor: backgroundColor?.layer,
            /* 边框颜色 */
            borderColor: borderColor?.base,
            /* 边框圆角 */
            borderRadius: borderRadius?.md,
            borderRadiusSmall: borderRadius?.sm
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