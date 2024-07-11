import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import ServicesConfig from '@/config/services'
import { handleRequestError } from '@/services/request/utils'

export const alovaInstance = createAlova({
    baseURL: '/mock',
    statesHook: VueHook,
    timeout: 10000,
    requestAdapter: GlobalFetch() ,
    beforeRequest() {
    },
    responded: {
        async onSuccess(response) {
            const errorMsg = ServicesConfig.STATUS_ERROR[response.status]
            if (errorMsg) return Promise.reject()

            return await response.json()
        },
        onError(err) {
            handleRequestError(err)
        }
    }
})
