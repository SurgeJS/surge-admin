export type RowAlign = 'baseline' | 'center' | 'flex-start' | 'flex-end'

export type RowJustify = 'center' | 'end' | 'start' | 'space-around' | 'space-between' | 'space-evenly'

// 'self' 根据自身宽度进行响应式布局，'screen' 根据屏幕断点进行响应式布局
export type RowResponsive = 'self' | 'screen'


export type BreakpointTypeProperty<K> = Partial<Record<BreakpointType, K>>

export interface RowProps {
    // 间距
    gutter?: number | string | [ number, number ] | [ string, string ]

    // 垂直对齐方式
    align?: RowAlign | BreakpointTypeProperty<RowAlign>

    // 水平对齐方式
    justify?: RowJustify | BreakpointTypeProperty<RowJustify>

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

export type ColProps = Col & /* @vue-ignore */ BreakpointTypeProperty<(number | string) | Col>

type StrOrNum = string | number

export interface GridProps {
    // 列数量
    cols?: StrOrNum | BreakpointTypeProperty<StrOrNum>

    // 是否折叠
    collapsed?: boolean

    // 默认展示的行数
    collapsedRows?: StrOrNum

    // 'self' 根据自身宽度进行响应式布局，'screen' 根据屏幕断点进行响应式布局
    responsive?: RowResponsive

    // X 间距
    xGap?: StrOrNum

    // Y 间距
    yGap?: StrOrNum
}

export interface GridItemProps {
    // 栅格占据的列数，为 0 的时候会隐藏
    span?: StrOrNum | BreakpointTypeProperty<StrOrNum>

    // 栅格左侧的间隔格数
    offset?: StrOrNum

    // 栅格后缀
    suffix?: boolean
}