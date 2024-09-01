import { GlobalThemeOverrides } from 'naive-ui'


declare global {

    interface ThemeOverrides extends GlobalThemeOverrides {
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


