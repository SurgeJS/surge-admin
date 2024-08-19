import ServicesConfig from '@/config/services'
import { handleAxiosError, handleResponseError } from '@/services/request/utils'
import { getApiUrl, wrapperMetaEnv } from '@/utils/env'
import CreateAxios from '@/services/request/axios'
import { ResponseContent } from '@/services/request/axios/types'

const { VITE_SERVICE_CONFIG } = wrapperMetaEnv()
const axiosInstance = new CreateAxios<Result>({
    baseURL: getApiUrl('main', VITE_SERVICE_CONFIG),
    timeout: 10000,
    interceptor: {
        onBeforeRequest() {

        },
        onResponse(response) {
            const { code, msg, result } = response.data
            const responseContent: ResponseContent<Result> = [ result, undefined, response ]

            // 处理响应错误
            if (ServicesConfig.SUCCESS_CODE !== code) {
                // 错误的响应内容
                responseContent[1] = { code, msg }
                return handleResponseError(code, responseContent, response.config)
            }

            return responseContent
        },
        onResponseError(error) {
            return handleAxiosError(error)
        },
    }
})

export default axiosInstance

