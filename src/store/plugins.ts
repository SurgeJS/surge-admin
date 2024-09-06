import { PiniaPluginContext } from 'pinia'
import { cloneDeep } from 'lodash-es'

const storeResetPlugin = (context: PiniaPluginContext) => {
    const { $state } = context.store
    context.store.$reset = () => {
        context.store.$patch(cloneDeep($state))
    }
}

export default [ storeResetPlugin ]