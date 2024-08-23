import { GlobalToken } from 'ant-design-vue/es/theme/interface'

declare global {

    interface ThemeConfig extends Partial<GlobalToken> {
    }

    /* ------中性主题变量------ */
    declare interface NeuterTheme {
        // 明亮字体
        textLight?: string

        // 暗色背景
        bgDark?: string

        // 填充暗色
        fillDark?: string

        // 边框暗色
        borderDark?: string
    }

}


