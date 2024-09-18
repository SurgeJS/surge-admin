import { createCache } from '@/utils/cache'
import { MenuSearchOption } from '@/layout/components/Header/components/MenuSearch/components/MenuSearchModal.vue'
import { AppStore } from '@/store/modules/app/type'

// Token缓存
export const tokenCache = createCache<string>('SLEEK_TOKEN', 'cookie')

// App配置缓存
export const appCache = createCache<AppStore>('SLEEK_APP')

// 菜单搜索缓存
export const menuSearchCache = createCache<MenuSearchOption[]>('SLEEK_MENU_SEARCH')