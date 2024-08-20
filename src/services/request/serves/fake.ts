import ServicesConfig from '@/config/services'
import CreateAxios from '@/services/request/axios'
import { handleAxiosError, handleResponseError } from '@/services/request/utils'
import { ResponseContent } from '@/services/request/axios/types'
import { getServiceAddress } from '@/utils/env'

const fakeService = new CreateAxios<Result>({
    baseURL: getServiceAddress('fake'),
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
        async onResponseError(error) {
            return handleAxiosError(error)
        },
    }
})

export default fakeService
