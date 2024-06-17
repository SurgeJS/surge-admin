import { GlobalToken } from 'ant-design-vue/es/theme/interface'

export default class AppConfig {
  // 系统主题色
  static THEME_COLOR = [
    '#6675ff','#E74C3C','#8E44AD','#3498DB','#16A085','#2ECC71','#F1C40F','#F39C12','#D35400'
  ]

  // Antd主题属性key(用于生成CSS变量，方便于unoCss引用)
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

  // 自定义Css变量(用于生成CSS变量，方便于unoCss引用)
  static CUSTOMIZE_CSS_KEY: (keyof CustomTheme)[] = [
    'bgDark',
    'fillDark',
    'textLight'
  ]

  // Antd明亮主题
  static ANTD_LIGHT_THEME: Partial<GlobalToken> = {}

  // Antd暗黑主题
  static ANTD_DARK_THEME: Partial<GlobalToken> = {}

  // 自定义主题
  static CUSTOM_THEME: CustomTheme = {
    textLight: 'rgba(255, 255, 255, 0.85)',
    bgDark: '#001529',
    fillDark: 'rgba(255, 255, 255, .1)',
    borderDark: '#2b2f34'
  }
}
