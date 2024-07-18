import ServicesConfig from '@/config/services'
import CreateAxios from "@/services/request/axios"
import { handleAxiosError, handleResponseError } from "@/services/request/utils"
import { ResponseContent } from "@/services/request/axios/types"

const fakeAxiosInstance = new CreateAxios<Result>({
    baseURL: '/mock',
    timeout: 10000,
    interceptor: {
        onBeforeRequest(config) {
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

            return [ response.data.result, undefined, response ]
        },
        async onResponseError(error) {
            console.log(error)
            return handleAxiosError(error)
        },
    }
})

export default fakeAxiosInstance
