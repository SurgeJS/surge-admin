import axios,{ AxiosRequestConfig } from 'axios'


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
    return { ...config.data,$responseBody: config }
},error => {
    return Promise.reject(error)
})

// 用泛型包装
export const mockRequest = <Data = any,Expand = Recordable,Params = Recordable>(config: AxiosRequestConfig) => {
    return mockAxiosInstance.request<Data,MainService.Result<Data,Expand>,Params>(config)
}

export default { mockAxiosInstance }
