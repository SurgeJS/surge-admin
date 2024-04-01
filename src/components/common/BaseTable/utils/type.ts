import { SuperTableProps } from '@/components/antd/SuperTable/utils/type'

export interface BaseTableProps extends SuperTableProps{
    // 标题
    heading?: string

    // 隐藏工具栏
    hideToolBar?: boolean

    // 隐藏头部
    hideHeader?: boolean
}
