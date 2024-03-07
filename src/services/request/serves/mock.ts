import axios,{ AxiosRequestConfig } from 'axios'
import { handleInterceptorError } from '@/services/request/utils'
import ServicesConfig from '@/config/services'
import { message } from 'ant-design-vue'
import useAuthStore from '@/store/modules/auth'


const mockAxiosInstance = axios.create({
    baseURL: '/mock',
    timeout: 10000
})

mockAxiosInstance.interceptors.request.use(config => {
    return config
},error => {
    return Promise.reject(error)
})

mockAxiosInstance.interceptors.response.use(config => {
    const authStore = useAuthStore()
    const logOut = ServicesConfig.SIGN_OUT_STATUS_CODE.get(config.data.code)
    if (logOut) {
        void message.error(logOut)
        return authStore.signOut()
    }
    return { ...config.data,$responseBody: config }
},error => {
    handleInterceptorError(error)
    return Promise.reject(error)
})

// 用泛型包装
export const mockRequest = <Data = any,Expand = Recordable,Params = Recordable>(config: AxiosRequestConfig) => {
    return mockAxiosInstance.request<Data,MainService.Result<Data,Expand>,Params>(config)
}

export default { mockAxiosInstance }
