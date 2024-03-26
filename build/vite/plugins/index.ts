// 导出vite插件
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { htmlPlugin } from './plugins/html'
import { compressPlugin } from './plugins/compress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'
import { unPlugin } from './plugins/unplugin'
import { localSvgPlugin } from './plugins/localSvg'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'

export const createVitePlugins = (viteEnv: ImportMetaEnv): PluginOption[] => {
    const { VITE_USE_MOCK,VITE_LEGACY,VITE_USE_PWA } = viteEnv
    return [
        vue(),
        // Jsx 语法
        vueJsx(),
        // 配置 ejs
        htmlPlugin(viteEnv),
        // 配置 本地svg
        localSvgPlugin(viteEnv),
        // 打包压缩
        compressPlugin(viteEnv),
        // 配置icon1
        ...unPlugin(),
        // 兼容一些旧版浏览器
        VITE_LEGACY && legacy({ targets: [ 'defaults','not IE 11' ] }),
        // PWA
        VITE_USE_PWA && VitePWA({}),
        // 数据模拟
        VITE_USE_MOCK && vitePluginFakeServer({
            enableProd: true
        })
    ]
}
