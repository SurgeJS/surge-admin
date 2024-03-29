/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // 主色
        'primary': 'var(--colorPrimary)',
        // 浅主色
        'primary-shallow': 'var(--colorPrimaryBg)',
        // 一级填充色
        'fill': 'var(--colorFill)',
        // 二级填充色
        'fill-secondary': 'var(--colorFillSecondary)',
        // 三级填充色
        'fill-tertiary': 'var(--colorFillTertiary)',
        // 四级填充色
        'fill-quaternary': 'var(--colorFillQuaternary)',
        // 填充暗黑色
        'fill-dark': 'rgba(255, 255, 255, .1)'
      },
      textColor: {
        // 一级文本色
        'main': 'var(--colorText)',
        // 二级级文本色
        'secondary': 'var(--colorTextSecondary)',
        // 三级文本色
        'tertiary': 'var(--colorTextTertiary)',
        // 四级文本色
        'quaternary': 'var(--colorTextQuaternary)',
        // 亮色
        'light': 'rgba(255, 255, 255, 0.85)'
      },
      backgroundColor: {
        // 组件容器背景色
        'container': 'var(--colorBgContainer)',
        // 浮层容器背景色
        'container-elevated': 'var(--colorBgElevated)',
        // 布局背景色
        'layout': 'var(--colorBgLayout)',
        // 引起注意的背景色
        'spotlight': 'var(--colorBgSpotlight)',
        // 浮层的背景蒙层颜色
        'mask': 'var(--colorBgMask)',
        // 背景暗黑色
        'dark': '#001529'
      },
      borderColor: {
        // 一级边框色
        'main': 'var(--colorBorder)',
        // 二级边框色
        'secondary': 'var(--colorBorderSecondary)',
        // 边框黑色
        'dark': '#2b2f34'
      },
      boxShadow: {
        'main': 'var(--boxShadow)',
        'secondary': 'var(--boxShadowSecondary)'
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding'
      }
    }
  },
  plugins: []
}
