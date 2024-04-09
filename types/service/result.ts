// 后台响应结构
declare type Result<Data = any,Expand = Recordable> = {
  // 系统状态
  code: number

  // 系统状态信息
  msg: string

  // data
  result?: Data

} & Partial<Expand>

