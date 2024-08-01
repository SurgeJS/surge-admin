import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import createAuthGuard from '@/router/utils/guard/auth'

const createRouterGuard = (router: Router) => {
    // 跳转之前
    router.beforeEach((to, from, next) => {
        // 鉴权守卫
        createAuthGuard(to, from, next)
    })

    // 跳转之后
    router.afterEach(to => {
        useTitle(to.meta.title)
    })
}
export default createRouterGuard