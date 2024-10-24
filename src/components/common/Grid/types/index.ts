export type RowAlign = 'baseline' | 'center' | 'flex-start' | 'flex-end'

export type RowJustify = 'center' | 'end' | 'start' | 'space-around' | 'space-between' | 'space-evenly'

// 'self' 根据自身宽度进行响应式布局，'screen' 根据屏幕断点进行响应式布局
export type RowResponsive = 'self' | 'screen'


export interface RowProps {
    // 间距
    gutter?: number | string | [ number, number ] | [ string, string ]

    // 垂直对齐方式
    align?: RowAlign | Record<BreakpointType, RowAlign>

    // 水平对齐方式
    justify?: RowJustify | Record<BreakpointType, RowJustify>

    // 'self' 根据自身宽度进行响应式布局，'screen' 根据屏幕断点进行响应式布局
    responsive?: RowResponsive
}

export interface Col {
    // 占据的列数，为 0 的时候会隐藏
    span?: number | string

    // 偏移
    offset?: number | string

    // 后缀(不能和offset同时使用)
    suffix?: boolean

    // flex 布局填充
    flex?: number | string
}

export type ColProps = Col & /* @vue-ignore */ Partial<Record<BreakpointType, (number | string) | Col>>
