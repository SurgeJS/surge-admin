import { Ref } from 'vue'
import { TestApi } from '@/services/api/test'
import { usePagination } from '@alova/scene-vue'
import { usePaginationQuery } from '@/hooks/service/usePaginationQuery'

export default class TestApiHook {
    static useGetTodoList = (query: Ref<Recordable>) => usePagination(
        (pageNo,pageSize) => TestApi.getTodoList({
            ...query.value,
            pageNo,
            pageSize
        }),
        {
            data: ({ result }) => result.list,
            total: ({ result }) => result.total
        }
    )


    static useGetTodoListB = (query: Ref<Recordable>) => {
       return usePaginationQuery(query,TestApi.getATodoList)
    }
}

