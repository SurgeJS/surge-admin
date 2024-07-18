import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { AxiosConfig, ResponseContent } from "@/services/request/axios/types"
import { omit } from "lodash-es"


/**
 * 统一了请求出口
 */
export default class CreateAxios<R extends Recordable = Recordable> {
    public axiosInstance: AxiosInstance

    constructor(config: AxiosConfig<R>) {
        this.axiosInstance = axios.create(omit(config, [ 'onBeforeRequest', 'onResponse' ]))

        // 请求拦截器
        this.axiosInstance.interceptors.request.use(
            async (requestConfig) => {
                await config.interceptor?.onBeforeRequest?.(requestConfig)
                return requestConfig
            },
            error => Promise.reject(error)
        )

        // 响应拦截器
        this.axiosInstance.interceptors.response.use(
            (response) => (config.interceptor?.onResponse?.(response) || response) as any,
            (error: AxiosError) => config?.interceptor?.onResponseError?.(error)
        )
    }

    public request<T = unknown, D = unknown>(config: AxiosRequestConfig<D>): Promise<ResponseContent<T, D>> {
        return this.axiosInstance.request<ResponseContent<T, D>>(config) as unknown as Promise<ResponseContent<T, D>>
    }

    public get<T = unknown, D = unknown>(url: string, params?: D, config?: AxiosRequestConfig<D>) {
        return this.request<T, D>({ method: 'get', url, params, ...config })
    }

    public post<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.request<T, D>({ method: 'post', url, data, ...config })
    }

    public put<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.request<T, D>({ method: 'put', url, data, ...config })
    }

    public delete<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        return this.request<T, D>({ method: 'delete', url, data, ...config })
    }
}
