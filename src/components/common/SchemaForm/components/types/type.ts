import { SchemaConfig } from '@/components/common/SchemaForm/types/type'

export interface SchemaFormItemProps {
    schema: Required<SchemaConfig>

    disable?:boolean
}