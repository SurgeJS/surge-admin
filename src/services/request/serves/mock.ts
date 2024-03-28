import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import ServicesConfig from '@/config/services'
import { message } from 'ant-design-vue'
import { handleRequestError } from '@/services/request/utils'


export const alovaInstance = createAlova({
    baseURL: '/mock',
    statesHook: VueHook,
    timeout: 10000,
    requestAdapter: GlobalFetch() ,
    beforeRequest(method) {
        // console.log(method.data)
    },
    responded: {
        async onSuccess(response,method) {
            const errorMsg = ServicesConfig.STATUS_ERROR[response.status]
            // console.log(response)
            if (errorMsg) {
                message.error(errorMsg)
                return Promise.reject()
            }
            const json = await response.json()
            // console.log(json)
            return json
        },
        onError(err,method) {
            // console.log(err)
            handleRequestError(err)
        }
    }
})
