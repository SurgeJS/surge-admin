import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import NProgress from 'nprogress'
import createAuthGuard from '@/router/utils/guard/auth'

const createRouterGuard = (router: Router) => {
    // 跳转之前
    router.beforeEach((to, from, next) => {
        NProgress.start()
        // 鉴权守卫
        createAuthGuard(to, from, next)
    })

    // 跳转之后
    router.afterEach(to => {
        useTitle(to.meta.title)
        NProgress.done()
    })
}
export default createRouterGuard