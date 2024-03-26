import ServicesConfig from '@/config/services'
import { message } from 'ant-design-vue'

// 用来解决重复错误提示
let lastMessage: string | undefined = undefined

// 解决重复错误提示
export const handleRepeatErrorMessage = (messageContent: string) => {
    if (messageContent === lastMessage && ServicesConfig.CLOSE_REPEAT_ERROR_MESSAGE) return
    message.error({ content: messageContent,onClose: () => lastMessage = undefined })
    lastMessage = messageContent
}

export const handleRequestError = (err) => {
    Object.keys(ServicesConfig.REQUEST_ERROR).forEach(key => {
        if ((err.message as string).includes(key)) handleRepeatErrorMessage(ServicesConfig.REQUEST_ERROR[key])
    })
}

