import { omit } from 'lodash-es'

const useOmitSlots = <T extends Recordable,K extends keyof T> (slots:T,omitKeys:K[]) => {
    const slotKeys = ref<keyof Omit<T, K>[]>([])
    onMounted(() => {
        slotKeys.value = Object.keys(omit(slots,omitKeys)).map(key=>key)
    })
    return slotKeys
}

export default useOmitSlots