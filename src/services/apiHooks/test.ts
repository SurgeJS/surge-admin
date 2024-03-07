import { Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { TestApi } from '@/services/api/test'
import { message } from 'ant-design-vue'
import useComputedPage from '@/hooks/common/useComputedPage'

export default class TestApiHook {
    static useGetTodoList = (query: Ref<Recordable>) => {
        const page = useComputedPage(query)
        return useQuery({
            queryKey: [ 'useGetTodoList',page ],
            queryFn: async () => {
                const { result,code,msg } = await TestApi.getTodoList(query.value)
                if (code !== 200) {
                    message.error(msg ?? 'Todo列表获取失败')
                    return Promise.reject()
                }
                return result
            }
        })
    }

    static useGetProductList = () => useQuery({
        queryKey: [ 'useGetProductList' ],
        queryFn: async () => {
            const { result } = await TestApi.getProductList()
            return result
        }
    })
}
