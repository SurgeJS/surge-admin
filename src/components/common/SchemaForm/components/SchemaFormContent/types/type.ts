import { UnwrapSchema } from '@/components/common/SchemaForm/types/common.ts'
import { GridItemProps, GridProps } from '@/components/common/Grid/types'

export interface SchemaFormContent {
    schema: UnwrapSchema[]

    gridProps: GridProps

    gridItemProps?: number | GridItemProps
}