import { SchemaType } from '@/components/common/SchemaForm/types/type'
import { Gutter } from 'ant-design-vue/es/grid/Row'

export interface SchemaFormContent {
    schema: SchemaType[]

    rowGutter?: Gutter | [ Gutter, Gutter ]
}