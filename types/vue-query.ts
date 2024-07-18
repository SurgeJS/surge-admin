import '@tanstack/vue-query'
import { ResponseError } from "@/services/request/axios/types"

declare module '@tanstack/vue-query' {
    // 全局注册
    interface Register {
        // 注册全局错误
        defaultError: ResponseError
    }
}