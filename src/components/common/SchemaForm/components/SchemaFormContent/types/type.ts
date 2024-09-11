import { UnwrapRefSchema } from '@/components/common/SchemaForm/types/type'

export interface SchemaFormContent {
    schema: UnwrapRefSchema[]

    rowGutter?: string | number | [ number, number ]
}