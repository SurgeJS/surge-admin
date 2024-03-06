import { useQuery } from '@tanstack/vue-query'
import { computed,Ref } from 'vue'
import { mockRequest } from '@/services/request/serves/mock'

export class TestApi {
    static getTodoList = (query: Ref<unknown>) => mockRequest({
        url: '/getTodos',
        method: 'post',
        data: query.value
    })

    static useGetTodoList = (query: Ref<Recordable>) => {
        const page = computed(() => ({
            pageSize: query.value.pageSize,
            pageNo: query.value.pageNo
        }))
        return useQuery({
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
}
