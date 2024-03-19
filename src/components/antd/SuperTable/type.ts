import { TableProps } from 'ant-design-vue'
import type { ColumnType,FilterDropdownProps } from 'ant-design-vue/es/table/interface'
import { ExpandedRowRender,RenderExpandIcon } from 'ant-design-vue/es/vc-table/interface'

export interface SuperTableProps extends TableProps {
    // 行拖拽
    rowDrag?: boolean
    // 列拖拽
    colDrag?: boolean
}

export interface TableSlots {
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

    // 额外的展开行
    expandedRowRender?: ExpandedRowRender<Recordable>

    // 自定义展开图标
    expandIcon?: RenderExpandIcon<Recordable>

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

export interface SuperTableSlots extends TableSlots {

}
