// 文字颜色
declare interface ThemeTextColors {
    // 一级文本颜色
    base?: string

    // 二级文本颜色
    secondary?: string

    // 三级文本颜色
    tertiary?: string

    // 禁用
    disabled?: string
}

// 背景颜色
declare interface ThemeBackgroundColors {
    // 布局背景颜色
    layout?: string

    // 容器背景颜色
    container?: string

    // 浮层背景颜色
    layer?: string

    // 遮罩层背景
    mask?: string
}

// 边框颜色
declare interface ThemeBorderColors {
    // 一级边框颜色
    base?: string

    // 二级边框颜色
    secondary?: string

    // 三级边框颜色
    tertiary?: string
}

// 填充颜色
declare interface ThemeFillColors {
    // 一级填充颜色
    base?: string

    // 二级填充颜色
    secondary?: string

    // 三级填充颜色
    tertiary?: string
}

// 主题
declare interface Theme {
    // 主要颜色
    primaryColors?: string[]

    // 文字颜色
    textColors?: ThemeTextColors

    // 背景颜色
    backgroundColors?: ThemeBackgroundColors

    // 边框颜色
    borderColors?: ThemeBorderColors

    // 填充颜色
    fillColors?: ThemeFillColors
}