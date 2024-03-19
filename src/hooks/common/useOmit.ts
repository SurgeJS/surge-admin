import { computed } from 'vue'
import { omit } from 'lodash-es'

/**
 * 省略属性
 * @param value 目标对象
 * @param keys 省略的key
 */
const useOmit = <T extends Recordable>(value: T,keys: Array<keyof typeof value>) => {
    return computed(() => omit(value,keys))
}
export default useOmit
