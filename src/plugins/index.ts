import vueQueryPlugins from '@/plugins/vueQuery.ts'
import { App } from 'vue'

const setupPlugins = (app:App) => {
    vueQueryPlugins(app)
}

export default setupPlugins