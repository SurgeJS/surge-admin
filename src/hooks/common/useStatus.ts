import {isReactive, reactive, Reactive} from "vue";
import {cloneDeep} from "lodash-es";

const useStatus = <T extends Recordable = Recordable>(status: Reactive<T> | T) => {
    const sta = isReactive(status) ? status : reactive(status);
    const initialStatus = cloneDeep(sta);

    const setStatus = <K extends keyof T>(key: K, value: T[K]) => {
        sta[key] = value
    }

    const getStatus = <K extends keyof T>(key: K) => sta[key]

    const resetStatus = () => {
        for (const key in initialStatus) {
            sta[key] = initialStatus[key]
        }
    }
    return {status, setStatus, getStatus, resetStatus}
}
export default useStatus
