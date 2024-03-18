import { App } from 'vue'
import { VueQueryPlugin,VueQueryPluginOptions } from '@tanstack/vue-query'

const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                // 关闭浏览器窗口失去焦点重新请求
                refetchOnWindowFocus: false
            }
        }
    }
}

const setupVuePlugins = (app: App<Element>) => {
    app.use(VueQueryPlugin,vueQueryPluginOptions)
}

export default setupVuePlugins
