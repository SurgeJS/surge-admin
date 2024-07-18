import { App } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { VueQueryPlugin } from '@tanstack/vue-query'

const setupPlugin = (app: App<Element>) => {
  app.use(MotionPlugin)
  app.use(VueQueryPlugin)
}

export default setupPlugin
