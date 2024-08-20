import { defineStore } from 'pinia'
import router from '@/router'
import RouterConfig from '@/config/router'
import { asyncWait } from '@/utils'
import { RouteRecordNameGeneric } from 'vue-router'
import { Tab, TabBarStore } from '@/store/modules/tabBar/type'

const useTabBarStore = defineStore('TabBar', {
    state: (): TabBarStore => ({
        // 标签栏
        tabs: [],
        // 刷新标志
        refreshFlag: true,
        // 刷新等待时间
        refreshWaitDuration: 400
    }),
    getters: {
        // 当前激活的tab
        activeTab(state): Tab {
            return state.tabs[this.activeIndex]
        },

        // 当前激活的index
        activeIndex(state) {
            return state.tabs.findIndex(item => item.path === router.currentRoute.value.path)
        },

        // 缓存菜单
        cacheMenus(state) {
            return state.tabs.reduce<RouteRecordNameGeneric[]>((cacheMenus, item) => {
                item.meta.keepAlive && cacheMenus.push(item.name)
                return cacheMenus
            }, [])
        },
    },
    actions: {
        // 是否激活
        isActive(path: string) {
            return router.currentRoute.value.path === path
        },

        // 是否存在
        isExist(path: string) {
            return this.tabs.some(item => item.path === path)
        },

        // 获取 index
        getIndex(path: string) {
            return this.tabs.findIndex(item => item.path === path)
        },

        // 添加 tabBar
        addTab(tab: Tab) {
            // 存在就替换，不存在就push
            this.isExist(tab.path) ?
                this.tabs.splice(this.getIndex(tab.path), 1, tab) :
                this.tabs.push(tab)
        },

        // 关闭
        closeTab(tab: Tab) {
            if (this.tabs.length === 1) return
            const index = this.getIndex(tab.path)
            this.tabs.splice(index, 1)
            this.isActive(tab.path) && router.push(this.tabs[this.tabs.length - 1].path)
            if (!tab.meta?.keepAlive) return
        },

        // 刷新当前激活的路由
        async refresh() {
            this.refreshFlag = false
            await asyncWait(this.refreshWaitDuration)
            this.refreshFlag = true
        },

        // 关闭左侧
        closeLeft(path: string) {
            const index = this.getIndex(path)
            if (index === 0 || index === -1) return
            index > this.activeIndex && router.push(path)
            const tabs = this.tabs.slice(index)
            this.tabs = [ ...this.getCurrentTabsAffixTab(index, 'left'), ...tabs ]
        },

        // 关闭右侧
        closeRight(path: string) {
            const index = this.getIndex(path)
            if (index === this.tabs.length - 1 || index === -1) return
            index < this.activeIndex && router.push(path)
            const tabs = this.tabs.slice(0, index + 1)
            this.tabs = [ ...tabs, ...this.getCurrentTabsAffixTab(index, 'right') ]
        },

        // 关闭其他
        closeOther(path: string) {
            const i = this.getIndex(path)
            if (i === -1) return
            i !== this.activeIndex && router.push(path)
            const tabs = [ ...this.getCurrentTabsAffixTab() ]
            const tab = this.tabs[i]
            if (!tab.meta?.affixTab) tabs.push(tab)
            this.tabs = tabs
        },

        // 关闭全部
        closeAll() {
            this.tabs = [ ...this.getCurrentTabsAffixTab() ]
            // 重定向到首页
            void router.push(RouterConfig.HOME_PATH)
        },

        // 获取当前Tabs的固定标签
        getCurrentTabsAffixTab(index?: number, direction?: 'left' | 'right'): Tab[] {
            return this.tabs.filter((item, i) => {
                let boundary = true
                if (index !== undefined && direction) {
                    boundary = direction === 'left' ? i < index : i > index
                }
                return item.meta?.affixTab && boundary
            })
        },

        // 获取路由中的固定标签
        getRouterAffixTabs(routes: AppRouteRecordRaw[]): Tab[] {
            return routes.reduce<Tab[]>((tabs, { path, name, meta, children }) => {
                meta?.affixTab && tabs.push({ fullPath: path, name, meta, path })
                children?.length && tabs.push(...this.getRouterAffixTabs(children))
                return tabs
            }, [])
        },

        // 初始化标签栏
        initializeTabBar(routes: AppRouteRecordRaw[]) {
            // 初始化固定标签
            this.tabs = [ ...this.getRouterAffixTabs(routes) ]
        }
    }
})

export default useTabBarStore
