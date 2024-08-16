import ServicesConfig from '@/config/services'
import CreateAxios from '@/services/request/axios'
import { handleAxiosError, handleResponseError } from '@/services/request/utils'
import { ResponseContent } from '@/services/request/axios/types'

const fakeAxiosInstance = new CreateAxios<Result>({
    baseURL: '/fake',
    timeout: 10000,
    interceptor: {
        onBeforeRequest() {
        },
        onResponse(response) {
            const responseContent: ResponseContent<Result> = [ response.data.result, undefined, response ]

            // 处理响应错误
            if (ServicesConfig.SUCCESS_CODE !== response.data.code) {
                // 错误的响应内容
                responseContent[1] = { code: response.data.code, msg: response.data.msg }
                return handleResponseError(response.data.code, responseContent)
            }

            return responseContent
        },
        async onResponseError(error) {
            return handleAxiosError(error)
        },
    }
})

export default fakeAxiosInstance
