import useMetaEnv from '@/hooks/common/useMetaEnv'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import ServicesConfig from '@/config/services'
import { message } from 'ant-design-vue'
import { handleRequestError } from '@/services/request/utils'

const { VITE_PROXY_PATH } = useMetaEnv()

export const alovaInstance = createAlova({
  baseURL: VITE_PROXY_PATH,
  statesHook: VueHook,
  timeout: 10000,
  requestAdapter: GlobalFetch(),
  beforeRequest() {
    // console.log(method.data)
  },
  responded: {
    async onSuccess(response) {
      const errorMsg = ServicesConfig.STATUS_ERROR[response.status]
      if (errorMsg) {
        message.error(errorMsg)
        return Promise.reject()
      }
      return await response.json()
    },
    onError(err) {
      handleRequestError(err)
    }
  }
})

