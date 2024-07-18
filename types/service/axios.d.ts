import 'axios'

declare module 'axios' {
    // 自定义请求配置
    interface AxiosRequestConfig {
        // 例如：忽略权限等等
        testAn?:number
    }
}