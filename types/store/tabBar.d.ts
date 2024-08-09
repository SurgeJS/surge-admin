import { RouteLocationNormalizedLoaded, RouteMeta } from 'vue-router'


declare global {
    interface Tab extends Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'path' | 'name'> {
        meta: RouteMeta
    }

    interface TabBarStore {
        // 标签栏
        tabs: Tab[]

        // 刷新标志
        refreshFlag: boolean

        // 刷新等待时间
        refreshWaitDuration: number
    }
}
