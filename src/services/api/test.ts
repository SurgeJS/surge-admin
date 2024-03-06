import { useQuery } from '@tanstack/vue-query'
import { ComputedRef,Ref } from 'vue'
import { mockRequest } from '@/services/request/serves/mock'

export class TestApi {
    static getTodoList = (query: Ref<unknown>) => mockRequest({
        url: '/getTodos',
        method: 'post',
        data: query.value
    })

    static useGetTodoList = (page: ComputedRef<Recordable>,query: Ref<Recordable>) => useQuery({
        queryKey: [ 'useGetTodoList',page ],
        queryFn: async () => {
            const data = await this.getTodoList(query)
            if (data.code !== 200) return Promise.reject('请求失败')
            return {
                total: data.total,
                list: data.result
            }
        }
    })
}
