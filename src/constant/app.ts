import { GlobalThemeOverrides } from 'naive-ui'

export default class AppConstant {
    // 移动端触发宽度
    static MOBILE_TRIGGER_WIDTH = 800

    // 系统主题色
    static PRIMARY_COLOR = '#6675ff'

    static COMMON_THEME: Theme = {
        borderRadius: {
            sm: '2px',
            md: '4px',
            lg: '8px',
        }
    }

    // 明亮主题
    static LIGHT_THEME: Theme = {
        textColor: {
            base: 'rgba(31, 34, 37, .9)',
            secondary: 'rgba(51, 54, 57, .9)',
            tertiary: 'rgba(118, 124, 130, .9)',
            disabled: 'rgba(194, 194, 194, .9)',
        },
        backgroundColor: {
            layout: '#f6f6f6',
            container: '#ffffff',
            layer: '#ffffff'
        },
        fillColor: {
            base: 'rgba(225,225,225,.8)',
            secondary: 'rgba(225,225,225,.4)',
            tertiary: 'rgba(225,225,225,.2)',
        },
        borderColor: {
            base: 'rgba(224,224,230,.9)',
            secondary: 'rgba(224,224,230,.8)',
            tertiary: 'rgba(224,224,230,.6)',
        },
        ...this.COMMON_THEME
    }

    // 暗黑主题
    static DARK_THEME: Theme = {
        textColor: {
            base: 'rgba(255, 255, 255, .9)',
            secondary: 'rgba(255, 255, 255, 0.82)',
            tertiary: 'rgba(255, 255, 255, 0.52)',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
        backgroundColor: {
            layout: '#101014',
            container: '#18181c',
            layer: '#2c2c32'
        },
        fillColor: {
            base: 'rgba(60,60,60,.8)',
            secondary: 'rgba(60,60,60,.6)',
            tertiary: 'rgba(60,60,60,.4)',
        },
        borderColor: {
            base: 'rgba(255,255,255,.24)',
            secondary: 'rgba(255,255,255,.18)',
            tertiary: 'rgba(255,255,255,.12)',
        },
        ...this.COMMON_THEME
    }

    // naive 组件明亮主题
    static NAIVE_COMPONENT_LIGHT_THEME: GlobalThemeOverrides = {}

    // naive 组件暗黑主题
    static NAIVE_COMPONENT_DARK_THEME: GlobalThemeOverrides = {
        common: {},
        Button: {
            textColorPrimary: 'rgba(255, 255, 255, .9)',
            textColorHoverPrimary: 'rgba(255, 255, 255, .9)',
            textColorPressedPrimary: 'rgba(255, 255, 255, .9)',
            textColorFocusPrimary: 'rgba(255, 255, 255, .9)',
            textColorDisabledPrimary: 'rgba(255, 255, 255, .9)',
        }
    }

    // 系统主题色预设
    static THEME_COLORS = [
        this.PRIMARY_COLOR, '#E74C3C', '#8E44AD', '#3498DB', '#16A085', '#2ECC71', '#F1C40F', '#F39C12', '#D35400'
    ]
}
