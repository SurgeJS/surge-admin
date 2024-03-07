// 主服务
declare namespace MainService {
    // 基础响应结构
    interface BaseResult<Data = any> {
        // 系统状态
        code: number
        // 系统状态信息
        msg: string
        // data
        result?: Data
        // axios 响应体（与后台响应结构无关）
        $responseBody: import('axios').AxiosResponse<Data>
    }

    // 结果扩展
    type Result<Data = any,Expand = Recordable<unknown>> = BaseResult<Data> & Expand

    // 分页
    interface Page {
        // 页数
        pageNo: number

        // 每页数量
        pageSize: number

        [key: string]: any
    }

    // 包装 接口请求分页
    type WrapperPage<Q> = Page & Q
}
