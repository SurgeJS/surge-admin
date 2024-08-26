import { GlobalToken } from 'ant-design-vue/es/theme/interface'

export default class AppConstant {
    // 系统主题色
    static THEME_COLOR = [
        '#6675ff', '#E74C3C', '#8E44AD', '#3498DB', '#16A085', '#2ECC71', '#F1C40F', '#F39C12', '#D35400'
    ]

    // TODO:边框弧度不统一
    // 明亮主题
    static LIGHT_THEME: ThemeConfig = {}

    // 暗黑主题
    static DARK_THEME: ThemeConfig = {}

    // 中性主题（不区分明亮和暗黑）
    static NEUTER_THEME: NeuterTheme = {
        textLight: 'rgba(255, 255, 255, 0.85)',
        bgDark: '#0a121e',
        fillDark: 'rgba(255, 255, 255, .1)',
        borderDark: '#2b2f34'
    }

    // ANTD 主题属性key(用于生成CSS变量，方便于unoCss引用)
    static ANTD_THEME_KEY: (keyof Partial<GlobalToken>)[] = [
        'colorPrimary',
        'colorPrimaryBg',
        'colorPrimaryBgHover',
        'colorPrimaryBorder',
        'colorPrimaryBorderHover',
        'colorPrimaryHover',
        'colorPrimaryActive',
        'colorPrimaryTextHover',
        'colorPrimaryText',
        'colorPrimaryTextActive',
        'colorText',
        'colorTextSecondary',
        'colorTextTertiary',
        'colorTextQuaternary',
        'colorBgContainer',
        'colorBgElevated',
        'colorBgLayout',
        'colorBgSpotlight',
        'colorBgMask',
        'colorBorder',
        'colorBorderSecondary',
        'colorFill',
        'colorFillSecondary',
        'colorFillTertiary',
        'colorFillQuaternary',
        'boxShadow',
        'boxShadowSecondary'
    ]
}
