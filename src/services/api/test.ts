import fakeAxiosInstance from '@/services/request/serves/fake'

export class TestApi {
    static getTodoList = (query) => fakeAxiosInstance.request({
        url: '/getTodos',
        method: 'post',
        data: query
    })
}
