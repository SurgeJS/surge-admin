// uno.config.ts
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { Theme } from '@unocss/preset-uno'

export default defineConfig<Theme>({
    content: {
        pipeline: {
            exclude: [ 'node_modules', 'dist' ],
        }
    },
    transformers: [
        transformerDirectives()
    ],
    presets: [
        presetUno(),
        presetIcons({
            scale: 1.2,
            // 额外的CSS属性配置
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle'
            },
            collections: {
                // 加载本地SVG 使用方式: i-local:xxx
                'local': FileSystemIconLoader('./src/assets/svg'),
            }
        })
    ],
    rules: [
        // 填充（单位 px）
        [ /^full-(\d+)$/, ([ , d ]) => ({ width: `${ d }px`, height: `${ d }px` }) ],
        // 填充（任意单位）
        [ /^full-\[(.*)]$/, ([ , d ]) => ({ width: d, height: d }) ]
    ],
    shortcuts: {
        'w-h-full': 'w-full h-full',
        'flex-center': 'flex justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',

        /* 为了自定义主题的代码提示 (unocss bug) */
        'text-main': 'text-main',
        'text-secondary': 'text-secondary',
        'text-tertiary': 'text-tertiary',
        'text-quaternary': 'text-quaternary',
        'text-light': 'text-light',
        'bg-container': 'bg-container',
        'bg-container-elevated': 'bg-container-elevated',
        'bg-layout': 'bg-layout',
        'bg-spotlight': 'bg-spotlight',
        'bg-mask': 'bg-mask',
        'bg-dark': 'bg-dark',
        'b-main': 'b-main',
        'b-secondary': 'b-secondary',
        'b-dark': 'b-dark',
    },
    extendTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                // 主色
                'primary': 'var(--primaryColor)',
                // 浅主色
                'primary-shallow': 'var(--colorPrimaryBg)',
                // 填充色
                'fill': {
                    // 一级填充色
                    'main': 'var(--colorFill)',
                    // 二级填充色
                    'secondary': 'var(--colorFillSecondary)',
                    // 三级填充色
                    'tertiary': 'var(--colorFillTertiary)',
                    // 四级填充色
                    'quaternary': 'var(--colorFillQuaternary)',
                    // 填充暗黑色
                    'dark': 'var(--fillDark)'
                },
            },
            textColor: {
                ...theme.textColor,
                // 一级文本色
                'main': 'var(--colorText)',
                // 二级级文本色
                'secondary': 'var(--colorTextSecondary)',
                // 三级文本色
                'tertiary': 'var(--colorTextTertiary)',
                // 四级文本色
                'quaternary': 'var(--colorTextQuaternary)',
                // 亮色
                'light': 'var(--textLight)'
            },
            backgroundColor: {
                ...theme.backgroundColor,
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
                'dark': 'var(--bgDark)'
            },
            borderColor: {
                ...theme.borderColor,
                // 一级边框色
                'main': 'var(--colorBorder)',
                // 二级边框色
                'secondary': 'var(--colorBorderSecondary)',
                'dark': 'var(--borderDark)'
            },
            boxShadow: {
                ...theme.boxShadow,
                'main': 'var(--boxShadow)',
                'secondary': 'var(--boxShadowSecondary)'
            }
        }
    },
})
