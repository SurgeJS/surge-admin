import { RouteRecordRaw } from 'vue-router'

declare global {
  /**
   * 路由组件类型
   * @description single 单页面 (例如：登录页)
   * @description basic 具有公共部分的布局 (公共左侧菜单栏、公共头部、公共底部)
   * @description directory 目录
   * @description submenu 子菜单（配合 basic | directory 一起用）
   * @description menu 菜单
   * */
  type RouteComponentType = 'single' | 'basic' | 'directory' | 'submenu' | 'menu'

  type OmitRouteRecordRaw = Omit<RouteRecordRaw, 'component' | 'components' | 'children' | 'name'>

  interface AppRouteRecordRaw extends OmitRouteRecordRaw {
    // 组件类型
    component?: RouteComponentType

    // 子路由
    children?: AppRouteRecordRaw[]
  }
}
