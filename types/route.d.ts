declare namespace Route {
    /**
     * 路由组件类型
     * @description single 单页面
     * @description basic 基础布局，具有公共部分的布局
     * @description directory 目录
     * @description submenu 子菜单（配合 basic | directory 一起用）
     * @description menu 子路由
     * */
    type RouteComponentType = 'single' | 'basic' | 'directory' | 'submenu' | 'menu'

    interface RouteRecordRaw extends Omit<import('vue-router').RouteRecordRaw,'component' | 'components' | 'children' | 'name'> {
        // 组件类型
        component: RouteComponentType

        components?: never

        children?: RouteRecordRaw[]

        name?: string
    }


    // 路由元数据
    interface Meta {
        // 名称
        title: string

        // 细粒度权限
        permissions?: string[]

        // 角色
        roles?: import('@/enums/auth').RoleEnum[]

        // 忽略鉴权，用户可以直接访问
        ignoreAuth?: boolean

        // 是否缓存
        keepAlive?: boolean

        // 是否固定在tab上
        affix?: boolean

        // 图标
        icon?: string

        // 内部嵌套地址
        frameSrc?: string

        // 菜单排序
        order?: number

        // 隐藏菜单 (可以通过路由访问)
        hideMenu?: boolean

        // 禁用菜单 (不能通过路由访问)
        disabledMenu?: boolean
    }
}
