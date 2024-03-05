import { computed } from 'vue'
import { omit } from 'lodash-es'

/**
 * 省略属性
 * @param props
 * @param keys
 */
const useOmitProps = <T extends Recordable>(props: T,keys: Array<keyof typeof props>) => {
    return computed(() => omit(props,keys))
}
export default useOmitProps
