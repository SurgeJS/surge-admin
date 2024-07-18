import fakeAxiosInstance from '@/services/request/serves/fake'
import { Ref } from "vue"
import { keepPreviousData, useQuery } from "@tanstack/vue-query"

export class TestApi {
    static getTodoList = (query: Recordable) => fakeAxiosInstance.post('/getTodos', query)
    static useTodoList = (query: Ref<Recordable>) => {
        const pageNo = computed(() => query.value.pageNo)
        const pageSize = computed(() => query.value.pageSize)
        return useQuery({
            queryKey: [ 'todoList', pageNo, pageSize ],
            placeholderData: keepPreviousData,
            queryFn: async (context) => {
                console.log(context)
                const [ data, error ] = await this.getTodoList(query.value)
                if (error) return Promise.reject(error)
                return data
            },
        })
    }
}
