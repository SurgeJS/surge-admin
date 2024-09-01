export default class AppConstant {
    // 移动端触发宽度
    static MOBILE_TRIGGER_WIDTH = 800

    // 系统主题色
    static THEME_COLOR = [
        '#6675ff', '#E74C3C', '#8E44AD', '#3498DB', '#16A085', '#2ECC71', '#F1C40F', '#F39C12', '#D35400'
    ]

    // 明亮主题
    static LIGHT_THEME: ThemeOverrides = {
        common:{
            primaryColor:'red'
        }
    }

    // 暗黑主题
    static DARK_THEME:ThemeOverrides = {
    }

    // 中性主题（不区分明亮和暗黑）
    static NEUTER_THEME: NeuterTheme = {

    }
}
