// 后台响应结构
declare interface Result<Data = any> {
    // 系统状态
    code: number

    // 系统状态信息
    msg: string

    // data
    result?: Data
}

// 分页参数
declare type PaginationParams<DParams extends Recordable> = {
    pageNo: number
    pageSize: number
} & DParams

// 分页响应
declare type PaginationResponse<TResponse extends Recordable> = {
    list: TResponse[]
    total: number
}