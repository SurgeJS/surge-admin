import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import { faker } from '@faker-js/faker/locale/zh_CN'

export default defineFakeRoute([
    {
        url: '/mock/getTodos',
        method: 'post',
        statusCode:500,
        response: (processedRequest,req,res) => {
            const { pageSize,pageNo } = processedRequest.body
            const list: Recordable[] = []
            for (let i = 0; i < 500; i++) {
                list.push({
                    id: faker.string.uuid(),
                    name: faker.person.fullName()
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
    }
])
