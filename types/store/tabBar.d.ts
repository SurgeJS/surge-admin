import { RouteLocationNormalizedLoaded,RouteMeta } from 'vue-router'


declare global {
  interface Tab extends Pick<RouteLocationNormalizedLoaded,'fullPath' | 'path'> {
    name?: string
    meta: RouteMeta
  }

  interface TabBarStore {
    // 标签栏
    tabs: Tab[]

    // 缓存菜单
    cacheMenus: string[]

    // 刷新
    mainVisible: boolean
  }
}
