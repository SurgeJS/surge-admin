import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/mock/getTodos',
        method: 'post',
        timeout: 1000,
        response(opt) {
            const { pageSize,pageNo,name,id } = opt.body
            const result: Recordable[] = []
            for (let i = 0; i < 500; i++) {
                result.push({
                    id: i,
                    name: `测试-${ i }`
                })
            }
            console.log(opt)
            console.log(pageNo)
            return {
                code: 200,
                msg: '操作成功',
                result,
                total: 500
            }
        }
    }
] as MockMethod[]
