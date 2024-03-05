import { useQuery } from '@tanstack/vue-query'
import { Ref } from 'vue'
import { mockRequest } from '@/services/request/serves/mock'

export class TestApi {
    static useGetTodoList = (query: Ref<unknown>) => useQuery({
        queryKey: [ 'useGetTodoList',query ],
        queryFn: () => mockRequest({
            url: '/getTodos',
            method: 'post',
            data: query.value
        })
    })
}
