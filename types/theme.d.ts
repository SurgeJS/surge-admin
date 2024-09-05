// 文字颜色
declare interface ThemeTextColor {
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
declare interface ThemeBackgroundColor {
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
declare interface ThemeBorderColor {
    // 一级边框颜色
    base?: string

    // 二级边框颜色
    secondary?: string

    // 三级边框颜色
    tertiary?: string
}

// 填充颜色
declare interface ThemeFillColor {
    // 一级填充颜色
    base?: string

    // 二级填充颜色
    secondary?: string

    // 三级填充颜色
    tertiary?: string
}

declare interface ThemeBorderRadius {
    sm?: string

    md?: string

    lg?: string
}

// 主题
declare interface Theme {
    // 文字颜色
    textColor?: ThemeTextColor

    // 背景颜色
    backgroundColor?: ThemeBackgroundColor

    // 边框颜色
    borderColor?: ThemeBorderColor

    // 填充颜色
    fillColor?: ThemeFillColor

    // 边框圆角
    borderRadius?: ThemeBorderRadius
}