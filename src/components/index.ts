import { App } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'

// 安装全局组件
const setupComponents = (app: App<Element>) => {
  const components = [ AgGridVue ]
  components.forEach(component => app.component(component.name as string,component))
}

export default setupComponents
