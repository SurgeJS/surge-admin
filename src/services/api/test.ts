import fakeAxiosInstance from '@/services/request/serves/fake'
import { Ref } from "vue"
import usePaginationQuery from "@/hooks/service/usePaginationQuery"

interface test {
    list: any[],
    total: number
}

export class TestApi {
    static getTodoList = (query: PaginationParams<Recordable>) => fakeAxiosInstance.post('/getTodos', query)

    static useTodoList = (query: Ref<PaginationParams<Recordable>>) =>
        usePaginationQuery<test>(query, 'todos', this.getTodoList)
}
