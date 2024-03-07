import { mockRequest } from '@/services/request/serves/mock'

export class TestApi {
    static getTodoList = (query) => mockRequest({
        url: '/getTodos',
        method: 'post',
        data: query
    })

    static getProductList = () => mockRequest({
        url: '/getProductList',
        method: 'post'
    })
}
