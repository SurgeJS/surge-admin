import useMetaEnv from '@/hooks/common/useMetaEnv'
import axios,{ AxiosRequestConfig } from 'axios'
import useAuthStore from '@/store/modules/auth'

const { VITE_PROXY_PATH } = useMetaEnv()

const mainAxiosInstance = axios.create({
    baseURL: VITE_PROXY_PATH,
    timeout: 10000
})

mainAxiosInstance.interceptors.request.use(config => {
    return config
},error => {
    return Promise.reject(error)
})

mainAxiosInstance.interceptors.response.use(config => {
    const authStore = useAuthStore()
    return { ...config.data,$responseBody: config }
},error => {
    return Promise.reject(error)
})

// 用泛型包装
const mainRequest = <Data = {},Expand = {},Params = {}>(config: AxiosRequestConfig) => {
    return mainAxiosInstance.request<Data,MainService.Result<Data,Expand>,Params>(config)
}

export default { mainAxiosInstance,mainRequest }


