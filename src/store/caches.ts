import { CacheType,createCache } from '@/utils/cache'

// Token缓存
export const tokenCache = createCache<string>('SIMPLE_TOKEN',CacheType.Cookie)

// App配置缓存
export const appCache = createCache<AppStore>('SIMPLE_APP',CacheType.LOCAL)
