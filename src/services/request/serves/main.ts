import useMetaEnv from '@/hooks/common/useMetaEnv'
import axios,{ AxiosRequestConfig } from 'axios'
import { handleInterceptorError } from '@/services/request/utils'
import ServicesConfig from '@/config/services'
import { message } from 'ant-design-vue'
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
    const isLogOut = ServicesConfig.SIGN_OUT_STATUS_CODE.get(config.data.code)
    if (isLogOut) {
        void message.error(isLogOut)
        return authStore.signOut()
    }
    return { ...config.data,$responseBody: config }
},error => {
    handleInterceptorError(error)
    return Promise.reject(error)
})

// 用泛型包装
const mainRequest = <Data = {},Expand = {},Params = {}>(config: AxiosRequestConfig) => {
    return mainAxiosInstance.request<Data,MainService.Result<Data,Expand>,Params>(config)
}

export default { mainAxiosInstance,mainRequest }


