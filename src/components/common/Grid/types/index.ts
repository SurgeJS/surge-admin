export type RowAlign = 'baseline' | 'center' | 'flex-start' | 'flex-end'

export type RowJustify = 'center' | 'end' | 'start' | 'space-around' | 'space-between' | 'space-evenly'

// 'self' 根据自身宽度进行响应式布局，'screen' 根据屏幕断点进行响应式布局
export type RowResponsive = 'self' | 'screen'


export type BreakpointTypeProperty<K> = Partial<Record<BreakpointType, K>>

export type StrOrNum = string | number

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

    // item 最大宽度
    itemMaxWidth?: StrOrNum

    // item 最小宽度
    itemMinWidth?: StrOrNum
}

export interface GridItemProps {
    // 栅格占据的列数，为 0 的时候会隐藏,大于 Grid cols 数量的时候会错位
    span?: StrOrNum | BreakpointTypeProperty<StrOrNum>

    // 栅格后缀
    suffix?: boolean
}