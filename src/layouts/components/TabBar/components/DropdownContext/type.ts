import { Trigger } from 'ant-design-vue/es/dropdown/props'
import { Tab } from '@/store/modules/tabBar/type'

export interface DropdownContextProps {
    trigger?: Trigger | Trigger[]
    tab?: Tab
}