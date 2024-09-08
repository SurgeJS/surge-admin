import { SchemaType } from '@/components/common/SchemaForm/types/type'

export interface SchemaFormContent {
    schema: SchemaType[]

    rowGutter?: string | number | [number, number]
}