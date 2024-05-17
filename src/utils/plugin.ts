import { App } from 'vue'
import { MotionPlugin } from '@vueuse/motion'

const setupPlugin = (app: App<Element>) => {
  app.use(MotionPlugin)
}

export default setupPlugin
