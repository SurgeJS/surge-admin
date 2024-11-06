/* --------------搜索表单-------------- */

import {
    DefineSchema,
    SchemaFormCommonExpose,
    SchemaFormCommonProps,
    SchemaFormCommonSlots
} from '@/components/common/SchemaForm/types/common.ts'

export interface SearchSchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: DefineSchema[]

    // 是否开启折叠
    enableCollapsed?: boolean

    // 查询表单默认展示个数
    searchShowNumber?: number

    // 是否折叠
    collapsed?: boolean

    // 隐藏折叠按钮
    hideCollapsedBtn?: boolean
}

export interface SearchSchemaFormExpose extends SchemaFormCommonExpose {
}

export type SearchSchemaFormSlots  =  SchemaFormCommonSlots & {
    // 自定义操作按钮
    customActionButton(params: { test: number }): any
}