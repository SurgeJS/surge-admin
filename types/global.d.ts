import { MaybeRef } from 'vue'

declare global {
  // 百度地图
  const BMap: any

  // 高德地图
  const AMap: any

  // 腾讯地图
  const TMap: any

  type Nullable<T> = T | null
  type Recordable<T = any> = Record<string,T>
  type MaybeArray<T> = T | Array<T>
  type MaybeRefs<T extends Recordable> = { [key in keyof T]: MaybeRef<T[key]> }
}
