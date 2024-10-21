// export type RowGutter =

export interface RowProps {
    // 间距
    gutter?: number | string | [ number, number ] | [ string, string ]

    // 是否折叠
    collapsed?: boolean

    // 折叠后默认展示个数
    showNumber?:string

    // 折叠动画
    foldAnimation?: boolean

    // 'self' 根据自身宽度进行响应式布局，'screen' 根据屏幕断点进行响应式布局
    responsive?: 'self' | 'screen'

    // 子元素是否可具有响应式宽度
    itemResponsive?: boolean
}

export interface ColProps {
    // 占据的列数，为 0 的时候会隐藏
    span?: number | string

    // 偏移
    offset?: number | string

    // 后缀(不能和offset同时使用)
    suffix?: boolean

    // flex 布局填充
    flex?: number | string
}
