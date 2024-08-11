import { SuperTableProps } from '@/components/antd/SuperTable/type/props'

export interface TableWrapProps extends SuperTableProps {
  // 标题
  heading?: string

  // 隐藏工具栏
  hideToolBar?: boolean

  // 隐藏头部
  hideHeader?: boolean
}

export interface TableWrapSlots {
  headerExtra():any
  
  heading():any
}