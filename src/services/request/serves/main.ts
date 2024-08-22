import ServiceConstant from '@/constant/service'
import { handleAxiosError, handleResponseError } from '@/services/request/utils'
import { getServiceAddress, wrapperMetaEnv } from '@/utils/env'
import CreateAxios from '@/services/request/axios'
import { ResponseContent } from '@/services/request/axios/types'

const { VITE_SERVICE_CONFIG } = wrapperMetaEnv()
const mainService = new CreateAxios<Result>({
    baseURL: getServiceAddress('main', VITE_SERVICE_CONFIG),
    timeout: ServiceConstant.REQUEST_TIMEOUT,
    interceptor: {
        onBeforeRequest() {

        },
        onResponse(response) {
            const { code, msg, result } = response.data
            const responseContent: ResponseContent<Result> = [ result, undefined, response ]

            // 处理响应错误
            if (ServiceConstant.SUCCESS_CODE !== code) {
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

export default mainService

