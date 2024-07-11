import 'alova'
import '@alova/scene-vue'
// 扩展alova自定义配置
declare module 'alova' {
  interface MethodRequestConfig {
    // 自定义配置 例如：忽略token ...
  }
}
