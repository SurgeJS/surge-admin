// export type RowGutter =

export interface RowProps {
    // 间距
    gutter?: number | [ number, number ]

    // 是否折叠
    collapsed?: boolean

    // 折叠行数
    collapsedRows?: number

    // 'self' 根据自身宽度进行响应式布局，'screen' 根据屏幕断点进行响应式布局
    responsive?: 'self' | 'screen'

    // 子元素是否可具有响应式宽度
    itemResponsive?: boolean
}

export interface ColProps {
    // 占据的列数，为 0 的时候会隐藏
    span?: number | string

    // 偏移
    offset?: number

    // 栅格前缀
    prefix?: boolean

    // 栅格后缀
    suffix?: boolean
}
