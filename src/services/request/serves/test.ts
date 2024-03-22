import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import ServicesConfig from '@/config/services'
import { message } from 'ant-design-vue'
import { handleRequestError } from '@/services/request/utils'

export const alovaInstance = createAlova({
    baseURL: '/mock',
    statesHook: VueHook,
    timeout: 1000,
    requestAdapter: GlobalFetch(),
    beforeRequest(method) {
        console.log(method.data)
    },
    responded: {
        async onSuccess(response,method) {
            const errorMsg = ServicesConfig.STATUS_ERROR[response.status]
            if (errorMsg) return message.error(errorMsg)
            const json = await response.json()
            return json
        },
        onError(err,method) {
            handleRequestError(err)
        }
    }
})


