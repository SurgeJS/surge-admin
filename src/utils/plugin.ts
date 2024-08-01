import { App } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import gsap from 'gsap'

const vueQueryOptions: VueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
    },
}

const setupPlugin = (app: App<Element>) => {
    app.use(MotionPlugin)
    app.use(VueQueryPlugin, vueQueryOptions)
    // gasp插件
    gsap.registerPlugin()
}

export default setupPlugin
