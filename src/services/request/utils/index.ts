import ServicesConfig from '@/config/services'
import { message } from 'ant-design-vue'
import { AxiosError } from 'axios'
import Hint from '@/config/hint'
import { ResponseContent, ResponseError } from '@/services/request/axios/types'
import useAuthStore from '@/store/modules/auth'

// 用来解决重复错误提示
let lastMessage: string | undefined = undefined

// 解决重复错误提示
export const handleRepeatErrorMessage = (messageContent: string) => {
    if (messageContent === lastMessage && ServicesConfig.CLOSE_REPEAT_ERROR_MESSAGE) return
    void message.error({ content: messageContent, onClose: () => lastMessage = undefined })
    lastMessage = messageContent
}

// 处理axios错误
export const handleAxiosError = (err: AxiosError) => {
    let errorMsg: string = Hint.SERVER_ERROR
    const responseContent: ResponseContent = [ undefined, undefined, err.response ]
    // 处理响应后的错误
    if (err.response) {
        // 请求已发出，但服务器响应的状态码错误
        const msg = ServicesConfig.STATUS_ERROR[err.response.status]
        if (msg) errorMsg = msg
        responseContent[1] = { code: err.response.status, msg: errorMsg }
    } else {
        // 处理请求时的错误
        const msg = ServicesConfig.REQUEST_ERROR[err.code as string]
        if (msg) errorMsg = msg
        responseContent[1] = { code: err.code as string, msg: errorMsg }
    }
    handleRepeatErrorMessage(errorMsg)
    return responseContent
}

// 处理响应错误
export const handleResponseError = async (code: number, responseContent: ResponseContent<any, any>) => {
    // 是否退出登录
    const isLogOut = Object.keys(ServicesConfig.SIGN_OUT_CODE).some(key => Number(key) === code)
    if (isLogOut) {
        const authStore = useAuthStore()
        // 退出登录
        await authStore.signOut()
        void message.warning(ServicesConfig.SIGN_OUT_CODE[code])
    } else {
        const responseError: ResponseError = responseContent[1] as ResponseError
        handleRepeatErrorMessage(ServicesConfig.STATUS_ERROR[responseError.code] || responseError.msg || Hint.SERVER_ERROR)
    }

    return responseContent
}

