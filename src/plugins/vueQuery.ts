import { VueQueryPlugin } from '@tanstack/vue-query'
import { App } from 'vue'

const vueQueryPlugins = (app:App) => {
    app.use(VueQueryPlugin, {
        queryClientConfig: {
            defaultOptions: { queries: { refetchOnWindowFocus: false } }
        }
    })
}

export default vueQueryPlugins