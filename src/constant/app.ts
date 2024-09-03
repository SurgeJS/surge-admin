import { GlobalThemeOverrides } from 'naive-ui'

export default class AppConstant {
    // 移动端触发宽度
    static MOBILE_TRIGGER_WIDTH = 800

    // 系统主题色
    static PRIMARY_COLOR = '#6675ff'

    // 明亮主题
    static LIGHT_THEME: Theme = {
        textColors: {
            base: 'rgba(31, 34, 37, .9)',
            secondary: 'rgba(51, 54, 57, .9)',
            tertiary: 'rgba(118, 124, 130, .9)',
            disabled: 'rgba(194, 194, 194, .9)',
        },
        backgroundColors: {
            layout: '#f6f6f6',
            container: '#ffffff',
            layer: '#ffffff'
        },
        fillColors: {
            base: 'rgba(50,50,50,.1)',
            secondary: 'rgba(50,50,50,.8)',
            tertiary: 'rgba(50,50,50,.6)',
        },
        borderColors: {
            base: 'rgba(224,224,230,1)',
            secondary: 'rgba(224,224,230,.8)',
            tertiary: 'rgba(224,224,230,.6)',
        }
    }

    // 暗黑主题
    static DARK_THEME: Theme = {
        textColors: {
            base: 'rgba(255, 255, 255, .9)',
            secondary: 'rgba(255, 255, 255, 0.82)',
            tertiary: 'rgba(255, 255, 255, 0.52)',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
        backgroundColors: {
            layout: '#101014',
            container: '#18181c',
            layer: '#2c2c32'
        },
        fillColors: {
            base: 'rgba(255,255,255,.1)',
            secondary: 'rgba(255,255,255,.8)',
            tertiary: 'rgba(255,255,255,.6)',
        },
        borderColors: {
            base: 'rgba(255,255,255,.24)',
            secondary: 'rgba(255,255,255,.18)',
            tertiary: 'rgba(255,255,255,.12)',
        }
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
