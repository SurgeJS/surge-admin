import { mockRequest } from '@/services/request/serves/mock'
import { alovaInstance } from '@/services/request/serves/test'

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

    static getATodoList = (query) => alovaInstance.Post<MainService.R>('/getTodos',query)
}
