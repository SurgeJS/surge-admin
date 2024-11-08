import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import setupComponents from '@/components'
import setupPlugins from '@/plugins'
import '@/assets/index'

const bootStart = async () => {
    const app = createApp(App)

    // 安装插件
    setupPlugins(app)

    // 挂载状态管理
    setupStore(app)

    // 安装全局组件
    setupComponents(app)

    // 挂载路由
    await setupRouter(app)
    
    app.mount('#app')
}

void bootStart()

