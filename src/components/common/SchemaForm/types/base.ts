/* --------------基础表单-------------- */
import {
    SchemaFormCommonExpose,
    SchemaFormCommonProps,
    SchemaFormCommonSlots,
    UnwrapRefSchema
} from '@/components/common/SchemaForm/types/common.ts'

export interface SchemaFormProps extends SchemaFormCommonProps {
    // schema 配置
    schema: UnwrapRefSchema[]
}

export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SchemaFormSlots extends SchemaFormCommonSlots {
}