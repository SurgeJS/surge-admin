// uno.config.ts
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
    transformers: [
        transformerDirectives()
    ],
    presets:
        [
            presetUno(),
            presetIcons({
                prefix: 'i-',
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
    rules:
        [
            // 填充（单位 px）
            [ /^full-(\d+)$/, ([ , d ]) => ({ width: `${ d }px`, height: `${ d }px` }) ],
            // 填充（任意单位）
            [ /^full-\[(.*)]$/, ([ , d ]) => ({ width: d, height: d }) ]
        ],
    shortcuts:
        {
            'w-h-full': 'w-full h-full',
            'flex-center': 'flex justify-center items-center',
            'flex-x-center': 'flex justify-center',
            'flex-y-center': 'flex items-center'
        },
    theme: {
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
            'fill-dark': 'var(--fillDark)'
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
            'light': 'var(--textLight)'
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
            'dark': 'var(--bgDark)'
        },
        borderColor: {
            // 一级边框色
            'main': 'var(--colorBorder)',
            // 二级边框色
            'secondary': 'var(--colorBorderSecondary)',
            'dark': 'var(--borderDark)'
        },
        boxShadow: {
            'main': 'var(--boxShadow)',
            'secondary': 'var(--boxShadowSecondary)'
        }
    }
})
