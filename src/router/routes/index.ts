import RouterConstant from '@/constant/router'

// Layout 根路由
export const ROUTE_ROOT: AppRouteRecordRaw = {
    path: '/',
    name: 'root',
    component: 'basic',
    redirect: RouterConstant.HOME_PATH
}

// 鉴权
export const ROUTE_AUTH: AppRouteRecordRaw = {
    path: RouterConstant.AUTH_ROUTE,
    component: 'view',
    redirect: RouterConstant.LOGIN_PATH,
    children: [
        {
            path: RouterConstant.LOGIN_PATH,
            component: 'view',
            meta: {
                title: '登录'
            }
        },
        {
            path: `${RouterConstant.AUTH_ROUTE}/phoneLogin`,
            component: 'view',
            meta: {
                title: '手机号登录'
            }
        },
        {
            path: `${RouterConstant.AUTH_ROUTE}/qrCodeLogin`,
            component: 'view',
            meta: {
                title: '二维码登录'
            }
        },
        {
            path: `${RouterConstant.AUTH_ROUTE}/register`,
            component: 'view',
            meta: {
                title: '注册'
            }
        }
    ],
}

// 未匹配到页面
export const ROUTE_NOT_FOUND: AppRouteRecordRaw = {
    path: '/:NotFound(.*)*',
    component: () => import('@/views/404/index.vue'),
    meta: { title: '404' }
}

export default [ ROUTE_ROOT, ROUTE_AUTH, ROUTE_NOT_FOUND ]
