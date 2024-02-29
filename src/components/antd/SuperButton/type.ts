import { ButtonProps } from 'ant-design-vue'

export interface SuperButtonEmits {
    (e: 'async-click',setLoading: (isLoading?: boolean) => void): void
}

export interface SuperButtonProps extends ButtonProps {
}

export interface SuperButtonSlots {
    default(props: any): any

    icon(props: any): any
}
