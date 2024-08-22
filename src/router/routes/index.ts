import RouterConstant from '@/constant/router'

// Layout 根路由
export const ROUTE_ROOT: AppRouteRecordRaw = {
    path: '/',
    name: 'root',
    component: 'basic',
    redirect: RouterConstant.HOME_PATH
}

// 登录页
export const ROUTE_LOGIN: AppRouteRecordRaw = {
    path: RouterConstant.LOGIN_PATH,
    component: 'view',
    meta: { title: '登录' }
}

// 404
export const ROUTE_404: AppRouteRecordRaw = {
    path: '/404',
    component: 'view',
    meta: { title: '404' }
}

// 未匹配到页面
export const ROUTE_NOT_FOUND: AppRouteRecordRaw = {
    path: '/:NotFound(.*)*',
    name: 'NotFound',
    redirect: '/404',
}

export default [ ROUTE_ROOT, ROUTE_LOGIN, ROUTE_404, ROUTE_NOT_FOUND ]
