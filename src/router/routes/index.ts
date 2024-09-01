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

// 未匹配到页面
export const ROUTE_NOT_FOUND: AppRouteRecordRaw = {
    path: '/:NotFound(.*)*',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404' }
}

export default [ ROUTE_ROOT, ROUTE_LOGIN, ROUTE_NOT_FOUND ]
