import ServicesConfig from '@/config/services'
import { handleAxiosError, handleResponseError } from '@/services/request/utils'
import { getMetaEnv } from '@/utils/env'
import CreateAxios from '@/services/request/axios'
import { ResponseContent } from '@/services/request/axios/types'

const { VITE_PROXY_PATH } = getMetaEnv()
const axiosInstance = new CreateAxios<Result>({
    baseURL: VITE_PROXY_PATH,
    timeout: 10000,
    interceptor: {
        onBeforeRequest() {

        },
        onResponse(response) {
            // 处理响应错误
            if (ServicesConfig.SUCCESS_CODE !== response.data.code) {
                // 错误的响应内容
                const errorResponseContent: ResponseContent<Result> = [
                    response.data.result,
                    { code: response.data.code, msg: response.data.msg },
                    response
                ]
                return handleResponseError(response.data.code, errorResponseContent)
            }

            return [response.data.result, undefined, response]
        },
        onResponseError(error) {
            return handleAxiosError(error)
        },
    }
})

export default axiosInstance

