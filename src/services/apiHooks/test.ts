import { Ref } from 'vue'
import { TestApi } from '@/services/api/test'
import { usePaginationQuery } from '@/hooks/service/usePaginationQuery'

export default class TestApiHook {
    static useGetTodoList = (query: Ref<Recordable>) => usePaginationQuery(query,TestApi.getATodoList)
}

