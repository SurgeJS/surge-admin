import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/index'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import setupComponents from '@/components'
import setupPlugin from '@/utils/plugin'

const bootStart = async () => {
    const app = createApp(App)

    // 安装插件
    setupPlugin(app)

    // 安装全局组件
    setupComponents(app)

    // 挂载状态管理
    setupStore(app)

    // 挂载路由
    await setupRouter(app)

    app.mount('#app')
}

void bootStart()

