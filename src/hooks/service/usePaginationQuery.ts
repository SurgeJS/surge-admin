import { usePagination,UsePaginationReturnType } from '@alova/scene-vue'
import { PaginationHookConfig } from '@alova/scene-vue/typings/general'
import { computed,Ref,WatchSource } from 'vue'
import { Method } from 'alova'
import { TablePaginationConfig } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'

export type UsePaginationQueryType<S,E,R,T,RC,RE,RH,LD extends unknown[]> =
    UsePaginationReturnType<S,E,R,T,RC,RE,RH,LD>
    &
    {
        /**
         * 重置query
         * @param {boolean} initiate 重置后是否发起请求
         * */
        resetQuery(initiate: boolean): void

        // 分页配置用于antd table组件
        pagination: Ref<TablePaginationConfig>,

        // antd table组件的事件
        antdTableOnChange(currentPage: { current: number,pageSize: number }): void

    }

/**
 * 分页查询
 * @param query 查询对象
 * @param fn 查询函数
 * @param config usePagination config
 */
export const usePaginationQuery = <
    S extends Ref,
    E extends Ref,
    R,
    T,
    RC,
    RE,
    RH,
    LD extends unknown[],
    WS extends (WatchSource | object)[]
>(
    query: Ref<Recordable>,
    fn: (query: Recordable) => Method<S,E,R,T,RC,RE,RH>,
    config?: PaginationHookConfig<S,E,R,T,RC,RE,RH,LD,WS>): UsePaginationQueryType<S,E,R,T,RC,RE,RH,LD> => {
    // 查询条件
    const initialQuery = cloneDeep(query.value)

    // 分页查询
    const handle = usePagination(
        (pageNo,pageSize) => fn({ ...query.value,pageNo,pageSize }),
        {
            ...config,
            // 根据自己的后端返回的结构自行修改
            data: ({ result }: any) => result.list,
            // 根据自己的后端返回的结构自行修改
            total: ({ result }: any) => result.total
        }
    )

    // 分页配置用于antd table组件
    const pagination = computed<TablePaginationConfig>(() => ({
        total: handle.total.value,
        current: handle.page.value,
        pageSize: handle.pageSize.value
    }))

    return {
        ...handle,
        resetQuery(initiate) {
            query.value = initialQuery
            initiate && handle.reload()
        },
        pagination,
        antdTableOnChange(currentPage) {
            handle.page.value = currentPage.current
            handle.pageSize.value = currentPage.pageSize
        }
    }
}
