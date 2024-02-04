// 图标选择器Props
export interface IconSelectProps {
    // 图标名称列表
    icons: string[]

    // 当前选中的图标
    current: string

    // 懒加载
    lazy?: boolean

    // 自动加载更多
    autoLoadingMore?: boolean

    // 默认展示数量（autoLoadingMore 为 ture 有效）
    defaultCount?: number
}
