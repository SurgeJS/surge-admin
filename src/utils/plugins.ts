import { App } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import gsap from 'gsap'

const setupPlugins = (app: App<Element>) => {
    app.use(VueQueryPlugin, {
        queryClientConfig: {
            defaultOptions: { queries: { refetchOnWindowFocus: false } }
        }
    })
    // gasp插件
    gsap.registerPlugin()
    // gsap
}

export default setupPlugins
