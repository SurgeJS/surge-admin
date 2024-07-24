// 需要权限的路由模块列表
import { RouteRecordRaw } from 'vue-router'
import { Sort } from '@/enums/common'
import RegularUtils from '@/utils/regular'
import { RoleEnum } from '@/enums/auth'

// 路由工具
export class RouterTool {
    // 前端路由模块列表
    static readonly ROUTER_MODULES_LIST = import.meta.glob('../modules/**.ts', { eager: true })

    // 静态路由模块
    static STATIC_ROUTES = import.meta.glob('../routes/**.ts', { eager: true })

    // 页面组件
    static readonly VIEW_COMPONENTS = import.meta.glob('@/views/**/**.vue')

    // 静态路由列表
    static getStaticRoutes() {
        return Object.keys(this.STATIC_ROUTES).reduce<AppRouteRecordRaw[]>((routerModules, routerKey) => {
            const router = (this.STATIC_ROUTES[routerKey] as any).default
            if (!(router instanceof Object)) return routerModules
            routerModules.push(...router)
            return routerModules
        }, [])
    }

    // 前端路由列表
    static getRouteList() {
        return Object.keys(this.ROUTER_MODULES_LIST).reduce<AppRouteRecordRaw[]>((routerModules, routerKey) => {
            const router = (this.ROUTER_MODULES_LIST[routerKey] as any).default
            if (!(router instanceof Object)) return routerModules
            routerModules.push(router)
            return routerModules
        }, [])
    }

    // 获取用户路由
    static getUserRouteList(roles: RoleEnum[]) {
        // 不需要授权
        const noNeedAuth = (route: AppRouteRecordRaw) => !route.meta?.roles?.length

        // 已授权
        const hasAuth = (route: AppRouteRecordRaw) => route.meta?.roles?.some(role => roles.includes(role))

        const getFrontRoute = (routeList: AppRouteRecordRaw[]) => routeList.reduce<AppRouteRecordRaw[]>((userRoute, route) => {
            // PUSH 权限路由
            const pushAuthRoute = () => {
                const cRoute = { ...route }
                userRoute.push(cRoute)

                if (cRoute.children?.length) {
                    cRoute.children = getFrontRoute(cRoute.children)
                    // 排序 升序
                    this.sortRoutes(cRoute.children, Sort.Ascending)
                }

                return userRoute
            }
            if (noNeedAuth(route) || hasAuth(route)) return pushAuthRoute()
            return userRoute
        }, [])
        const userRoutes = getFrontRoute(this.getRouteList())
        // 排序 升序
        this.sortRoutes(userRoutes, Sort.Ascending)
        return userRoutes
    }

    // 获取页面组件
    static getViewComponent(route: AppRouteRecordRaw) {
        // 内嵌链接存在&不自定义内嵌iframe组件
        if (route.meta?.iframeSrc && !route.meta?.isCustomizeIframeComponent) {
            return () => import('@/layout/components/DefaultFrame.vue')
        }
        // 组件路径
        const componentPath = `/src/views${ RegularUtils.removePathParams(route.path) }/index.vue`
        const viewComponent = Object.keys(this.VIEW_COMPONENTS).find(path => path === componentPath)
        if (!viewComponent) console.warn('没有找到组件：', componentPath)
        return this.VIEW_COMPONENTS[viewComponent as string]
    }

    // 自定义路由转 vue 路由
    static transformCustomRouteToVueRoute(route: AppRouteRecordRaw) {
        // 如果是外链就不转vue路由
        if (this.isExternalLink(route.path)) return undefined
        let vueRoute = { ...route, component: undefined } as RouteRecordRaw
        // 原始路径，不包含路径参数
        const recordPath = RegularUtils.removePathParams(route.path)
        vueRoute.name = recordPath
        switch (route.component) {
            // 单页面
            case 'single':
                vueRoute.component = this.getViewComponent(route)
                break
            // 子菜单
            case 'submenu':
                vueRoute.component = this.getViewComponent(route)
                break
            // 菜单
            case 'menu':
                // 一级路由转二级路由
                vueRoute = {
                    path: recordPath + '-container',
                    name: recordPath + '-container',
                    redirect: route.path,
                    component: () => import('@/layout/index.vue'),
                    children: [
                        {
                            ...route,
                            component: this.getViewComponent(route)
                        } as RouteRecordRaw
                    ]
                }
                break
            // 基础布局
            case 'basic':
                // 访问目录路由 自动重定向到目录下的第一个子菜单
                if (!vueRoute.redirect && vueRoute.children?.length) {
                    vueRoute.redirect = vueRoute.children[0].path
                }
                vueRoute.component = () => import('@/layout/index.vue')
                break
            // 目录
            case 'directory':
                vueRoute.component = undefined
                break
        }
        return vueRoute
    }

    // 批量自定义路由转 vue 路由
    static transformCustomRoutesToVueRoutes(routes: AppRouteRecordRaw[]) {
        return routes.reduce<RouteRecordRaw[]>((vueRoutes, route) => {
            const vueRoute = this.transformCustomRouteToVueRoute(route)
            if (route.children?.length && vueRoute) vueRoute.children = this.transformCustomRoutesToVueRoutes(route.children)
            vueRoute && vueRoutes.push(vueRoute)
            return vueRoutes
        }, [])
    }

    // 排序路由, 默认升序
    static sortRoutes(routes: AppRouteRecordRaw[], type: Sort) {
        routes.sort((a, b) => {
            if (type === Sort.Ascending) return Number(a.meta?.order) - Number(b.meta?.order)
            if (type === Sort.Descending) return Number(b.meta?.order) - Number(a.meta?.order)
            return 0
        })
    }

    // 是否外链
    static isExternalLink(url) {
        return RegularUtils.MATCH_URL.test(url)
    }

    // 打开外链
    static openTheLink(url: string) {
        const open = window.open('_blank')
        if (open) open.location = url
    }
}
