import { App } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'

const vueQueryOptions: VueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
    },
}

const setupPlugin = (app: App<Element>) => {
    app.use(MotionPlugin)
    app.use(VueQueryPlugin, vueQueryOptions)
}

export default setupPlugin
