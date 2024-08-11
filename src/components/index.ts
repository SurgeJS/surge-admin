import { App, Component, DefineComponent } from 'vue'

// 安装全局组件
const setupComponents = (app: App<Element>) => {
  const components:(Component|DefineComponent)[] = []
  components.forEach(component => app.component(component.name as string ,component))
}

export default setupComponents
