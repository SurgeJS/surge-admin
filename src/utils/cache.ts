import store from 'store2'
import Cookies from 'js-cookie'

// 缓存类型
export enum CacheType {
    // 本地
    LOCAL = 'local',
    // 会话
    SESSION = 'session',
    // 曲奇
    Cookie = 'cookie'
}

// 缓存模板
export interface CacheTemplate<T> {
    // 缓存名称
    key: string

    /**
     * 设置缓存
     * @param value 缓存的值
     * @param expires 过期时间，缓存类型为 Cookie 的时候有效
     */
    set(value: T,expires?: number): void

    /**
     * 获取缓存
     * @return T
     */
    get(): T | null

    /**
     * 删除缓存
     */
    remove(): void

    // TODO:扩展是否存在
}

/**
 * 创建缓存模板
 * @param key 换成名称
 * @param type 缓存类型,默认是local
 */
export const createCacheTemplate = <T>(key: string,type: CacheType = CacheType.Cookie): CacheTemplate<T> => {
    return {
        key,
        set(value,expires?) {
            switch (type) {
                case CacheType.LOCAL:
                    store.set(key,value)
                    break
                case CacheType.SESSION:
                    store.session.set(key,value)
                    break
                case CacheType.Cookie:
                    Cookies.set(key,value as string,{ expires })
            }
        },
        get() {
            switch (type) {
                case CacheType.LOCAL:
                    return store.get(key)
                case CacheType.SESSION:
                    return store.session.get(key)
                case CacheType.Cookie:
                    return Cookies.get(key)
            }
        },
        remove() {
            switch (type) {
                case CacheType.LOCAL:
                    return store.remove(key)
                case CacheType.SESSION:
                    return store.session.remove(key)
                case CacheType.Cookie:
                    return Cookies.remove(key)
            }
        }
    }
}
