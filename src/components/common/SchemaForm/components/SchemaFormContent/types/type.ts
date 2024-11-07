import { UnwrapRefSchema } from '@/components/common/SchemaForm/types/common.ts'
import { GridProps } from '@/components/common/Grid/types'

export interface SchemaFormContent {
    schema: UnwrapRefSchema[]

    gridProps: GridProps
}