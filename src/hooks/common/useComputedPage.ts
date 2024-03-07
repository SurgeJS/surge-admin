import { computed,isRef,Ref,toRef } from 'vue'


const useComputedPage = (value: Ref<Recordable> | Recordable) => {
    const hasRef = isRef(value)
    const recordPage = (hasRef ? value : toRef(value)) as Ref<Recordable>
    return computed<MainService.Page>(() => ({
        pageNo: recordPage.value?.pageNo,
        pageSize: recordPage.value?.pageSize
    }))
}

export default useComputedPage
