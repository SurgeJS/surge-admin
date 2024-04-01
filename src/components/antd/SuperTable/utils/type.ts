import type { ColumnType,FilterDropdownProps } from 'ant-design-vue/es/table/interface'
import { ExpandedRowRender,RenderExpandIcon } from 'ant-design-vue/es/vc-table/interface'
import { TableProps } from 'ant-design-vue'

// 自定义列配置
export interface SuperTableColumn extends ColumnType<Recordable> {
    // rowDrag?: boolean
    // 隐藏列
    hide?: boolean
}

// 自定义属性
export interface SuperTableProps extends Omit<TableProps,'columns'> {
    // // 行拖拽
    // rowDrag?: boolean
    //
    // // 列拖拽
    // colDrag?: boolean

    // 自定义列配置
    columns?: SuperTableColumn[]
}

// antd table 原有的插槽
export interface TableSlots {
    // 额外的展开行
    expandedRowRender?: ExpandedRowRender<Recordable>
    // 自定义展开图标
    expandIcon?: RenderExpandIcon<Recordable>

    // 个性化单元格
    bodyCell?(props: {
        text: any;
        value: any;
        record: Recordable;
        index: string | number;
        column: ColumnType;
    }): void

    // 自定义筛选菜单，需要配合 column.customFilterDropdown 使用
    customFilterDropdown?(props: FilterDropdownProps<any>): void

    // 自定义空数据时的显示内容
    emptyText?(): void

    // 自定义展开列表头
    expandColumnTitle?(): void

    // 自定义底部
    footer?(props: Recordable[]): void

    // 个性化头部单元格
    headerCell?(props: { title: string,column: ColumnType }): void

    // 总结栏
    summary?(): void

    // 表格标题
    title?(props: Recordable[]): void
}

// 自定义插槽
export interface SuperTableSlots extends TableSlots {

}

// 自定义事件
export interface SuperTableEmits {
    // 列拖拽事件
    (e: 'dragCol'): void

    // 行拖拽事件
    (e: 'dragRow'): void
}
