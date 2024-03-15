import 'vue-router'

declare module 'vue-router' {
    // 路由元数据
    interface RouteMeta extends Route.Meta {}
}
