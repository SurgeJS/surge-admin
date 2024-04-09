import { RouteRecordRaw } from 'vue-router'

declare global {
  /**
   * 路由组件类型
   * @description single 单页面
   * @description basic 基础布局，具有公共部分的布局
   * @description directory 目录
   * @description submenu 子菜单（配合 basic | directory 一起用）
   * @description menu 子路由
   * */
  type RouteComponentType = 'single' | 'basic' | 'directory' | 'submenu' | 'menu'

  interface AppRouteRecordRaw extends Omit<RouteRecordRaw,'component' | 'components' | 'children' | 'name'> {
    // 组件类型
    component: RouteComponentType

    components?: never

    children?: AppRouteRecordRaw[]

    name?: string
  }
}
