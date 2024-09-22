import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { createVitePlugins } from './build/plugins'
import { proxyConfig } from './build/proxy'
import { wrapperMetaEnv } from './src/utils/env'

export default defineConfig(({ mode }) => {
    const root = process.cwd()
    // 获取并包装 .env 环境变量
    const viteEnv = wrapperMetaEnv(loadEnv(mode, root))
    return {
        root,
        base: viteEnv.VITE_PUBLIC_PATH,
        plugins: createVitePlugins(viteEnv),
        server: {
            host: true,
            port: viteEnv.VITE_PORT,
            proxy: proxyConfig(viteEnv)
        },
        resolve: {
            // 别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '#': path.resolve(__dirname, 'types')
            }
        },
        build: {
            reportCompressedSize: true,
            sourcemap: false,
            minify: 'terser',
            brotliSize: true,
            terserOptions: {
                compress: {
                    // 删除所有 console
                    drop_console: viteEnv.VITE_DELETE_CONSOLE,
                    // 删除 所有 debugger
                    drop_debugger: true
                }
            }
        },
        css:{
            preprocessorOptions:{
                scss:{
                    api:'modern-compiler'
                }
            }
        }
    }
})
