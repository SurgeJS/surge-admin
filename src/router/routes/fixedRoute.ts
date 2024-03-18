import RouterConfig from '@/config/router'

// Layout 根路由
export const ROUTE_ROOT: Route.RouteRecordRaw = {
    path: '/',
    name: 'root',
    component: 'basic',
    redirect: RouterConfig.HOME_PATH
}

// 登录页
export const ROUTE_LOGIN: Route.RouteRecordRaw = {
    path: RouterConfig.LOGIN_PATH,
    name: 'login',
    component: 'single',
    meta: { title: '登录' }
}

// 404页面
export const ROUTE_404: Route.RouteRecordRaw = {
    path: '/:NotFound(.*)*',
    name: 'notFound',
    component: 'single',
    meta: { title: '404' }
}

export default [ ROUTE_ROOT, ROUTE_LOGIN, ROUTE_404 ]
