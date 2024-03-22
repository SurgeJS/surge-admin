import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/mock/getTodos',
        method: 'post',
        timeout: 1000,
        statusCode: 500,
        response(opt) {
            const { pageSize,pageNo,name,id } = opt.body
            const list: Recordable[] = []
            for (let i = 0; i < 500; i++) {
                list.push({
                    id: i,
                    name: `测试-${ i }`
                })
            }
            const result = list.slice(pageSize * (pageNo - 1),(pageSize * (pageNo - 1)) + pageSize)
            return {
                code: 200,
                msg: '操作成功',
                result: {
                    list: result,
                    total: list.length
                }
            }
        }
    },
    {
        url: '/mock/getProductList',
        method: 'post',
        timeout: 1000,
        response(opt) {
            const list: Recordable[] = []
            for (let i = 0; i < 500; i++) {
                list.push({
                    id: i,
                    name: `产品-${ i }`
                })
            }
            return {
                code: 200,
                msg: '操作成功',
                result: list
            }
        }
    },
    {
        url: '/mock/getProductProperty',
        method: 'post',
        timeout: 1000,
        response(opt) {
            const list: Recordable[] = []
            for (let i = 0; i < 500; i++) {
                list.push({
                    id: i,
                    pid: 500 % i,
                    name: `产品-${ i }`
                })
            }
            return {
                code: 200,
                msg: '操作成功',
                result: list
            }
        }
    }
] as MockMethod[]
