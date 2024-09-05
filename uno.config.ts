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
        'text-base': 'text-base',
        'text-secondary': 'text-secondary',
        'text-tertiary': 'text-tertiary',
        'bg-container': 'bg-container',
        'bg-layout': 'bg-layout',
        'bg-dark': 'bg-dark',
        'b-main': 'b-main',
        'b-secondary': 'b-secondary',
        'b-dark': 'b-dark',
    },
    theme: {
        colors: {
            // 主色
            'primary': 'var(--primary-5)',
            // 浅主色
            'primary-shallow': 'var(--primary-2)',
            // 填充色
            'fill': {
                // 一级填充色
                'base': 'var(--fill-color-base)',
                // 二级填充色
                'secondary': 'var(--fill-color-secondary)',
                // 三级填充色
                'tertiary': 'var(--fill-color-tertiary)',
                // 填充暗黑色
                'dark': 'var(--fillDark)'
            },
        },
        textColor: {
            // 一级文本色
            'base': 'var(--text-color-base)',
            // 二级级文本色
            'secondary': 'var(--text-color-secondary)',
            // 三级文本色
            'tertiary': 'var(--text-color-tertiary)',
            // 亮色
            'light': 'var(--textLight)'
        },
        backgroundColor: {
            // 布局背景色
            'layout': 'var(--background-color-layout)',
            // 容器背景色
            'container': 'var(--background-color-container)',
            // 浮层背景色
            'layer': 'var(--background-color-layer)',
            // 背景暗黑色
            'dark': 'var(--bgDark)'
        },
        borderColor: {
            // 一级边框色
            'base': 'var(--border-color-base)',
            // 二级边框色
            'secondary': 'var(--border-color-secondary)',
            // 三级边框色
            'tertiary': 'var(--border-color-tertiary)',
            'dark': 'var(--borderDark)'
        },
        borderRadius: {
            sm: 'var(--border-radius-sm)',
            md: 'var(--border-radius-md)',
            lg: 'var(--border-radius-lg)',
        }
    },
})
