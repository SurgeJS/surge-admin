import { UnwrapSchema } from '@/components/common/SchemaForm/types/common.ts'
import { GridItemProps } from '@/components/common/Grid/types'

export interface SchemaFormItemProps {
    schema: UnwrapSchema

    id: string

    disabled?: boolean

    gridItemProps?: GridItemProps | number
}