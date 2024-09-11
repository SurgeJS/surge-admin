import { computed } from 'vue'
import { omit } from 'lodash-es'

/**
 * 省略属性
 * @param value 目标对象
 * @param keys 省略的key
 */
const useOmitProps = <T extends Recordable, K extends keyof T>(value: T, keys: K[]) => {
    return computed(() => omit(value, keys))
}

export default useOmitProps
