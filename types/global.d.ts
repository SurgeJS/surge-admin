declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare type Recordable<T = any> = Record<string, T>

// 百度地图
declare const BMap: any

// 高德地图
declare const AMap: any

// 腾讯地图
declare const TMap: any
