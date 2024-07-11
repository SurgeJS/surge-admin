// 后台响应结构
declare interface Result<Data = any> {
  // 系统状态
  code: number

  // 系统状态信息
  msg: string

  // data
  result?: Data
}

