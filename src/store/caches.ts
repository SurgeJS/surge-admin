import { createCache } from '@/utils/cache'

// Token缓存
export const tokenCache = createCache<string>('SIMPLE_TOKEN', 'cookie')

// App配置缓存
export const appCache = createCache<AppStore>('SIMPLE_APP')