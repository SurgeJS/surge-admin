import { createHtmlPlugin } from 'vite-plugin-html'

export const htmlPlugin = (viteEnv: ImportMetaEnv) => createHtmlPlugin({
    // 生产环境压缩
    minify: true,
    inject: {
        data: {
            // index.html 标题
            title: viteEnv.VITE_GLOB_APP_TITLE
        }
    }
})
