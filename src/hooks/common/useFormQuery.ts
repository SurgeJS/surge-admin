import { cloneDeep } from 'lodash-es'
import { ref } from 'vue'

const useFormQuery = <T extends Recordable>(query: T) => {
    const initialQuery = cloneDeep<T>(query)
    const queryRef = ref<T>(query)

    const $reset = () => {
        queryRef.value = { ...initialQuery } as any
    }

    return { query: queryRef,$reset }
}


export default useFormQuery
