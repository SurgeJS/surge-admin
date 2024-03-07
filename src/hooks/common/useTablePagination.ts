import { computed,Ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { TablePaginationConfig } from 'ant-design-vue'

const useTablePagination = (query: Ref<MainService.Page>,total: Ref<number>,config?: TablePaginationConfig) => {
    const page = cloneDeep(query.value)

    const pagination = computed(() => ({
        total: total.value,
        current: query.value.pageNo,
        pageSize: query.value.pageSize,
        ...config
    }))

    const resetPagination = () => {
        query.value.pageNo = page.pageNo
        query.value.pageSize = page.pageSize
    }

    const onTableChange = (currentPage: { current: number,pageSize: number }) => {
        query.value.pageNo = currentPage.current
        query.value.pageSize = currentPage.pageSize
    }

    return { pagination,resetPagination,onTableChange }
}

export default useTablePagination
