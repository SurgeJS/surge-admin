import { CacheType,createCacheTemplate } from '@/utils/cache'

// Token缓存
export const tokenCache = createCacheTemplate<string>('SIMPLE_TOKEN',CacheType.Cookie)

// App配置缓存
export const appCache = createCacheTemplate<AppStore>('SIMPLE_APP',CacheType.LOCAL)
