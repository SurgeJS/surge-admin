import { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

const setupPlugins = (app: App<Element>) => {
    app.use(VueQueryPlugin, {
        queryClientConfig: {
            defaultOptions: { queries: { refetchOnWindowFocus: false } }
        }
    })
}

export default setupPlugins
