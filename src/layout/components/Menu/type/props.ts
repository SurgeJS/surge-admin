import { MenuMode } from "ant-design-vue"

export interface MenuProps {
    routes: AppRouteRecordRaw[]
    mode?: MenuMode
    inlineCollapsed?: boolean
    dark?: boolean
}