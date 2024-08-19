import { createCache } from '@/utils/cache'
import { MenuSearchOption } from '@/layouts/components/Header/components/MenuSearch/components/MenuSearchModal.vue'

// Token缓存
export const tokenCache = createCache<string>('SIMPLE_TOKEN', 'cookie')

// App配置缓存
export const appCache = createCache<AppStore>('SIMPLE_APP')

// 菜单搜索缓存
export const menuSearchCache = createCache<MenuSearchOption[]>('SIMPLE_MENU_SEARCH')