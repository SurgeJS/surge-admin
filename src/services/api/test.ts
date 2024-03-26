import { alovaInstance } from '@/services/request/serves/mock'

export class TestApi {
    static getTodoList = (query) => alovaInstance.Post<Result>('/getTodos',query)

    static getProductList = () => alovaInstance.Post<Result>('/getProductList')

    static getATodoList = (query) => alovaInstance.Post<Result>('/getTodos',query)
}
