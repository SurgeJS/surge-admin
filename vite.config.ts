import { defineConfig, loadEnv } from 'vite'
import * as path from 'path'
import { createVitePlugins } from './build/deploy/plugins'
import { wrapperEnv } from './build/utils'
import { proxyConfig } from './build/deploy/proxy'

export default defineConfig(({mode}) => {
    const root = process.cwd()
    // 获取并包装 .env 环境变量
    const viteEnv = wrapperEnv(loadEnv(mode, root))
    const {VITE_PORT, VITE_PUBLIC_PATH, VITE_DELETE_CONSOLE} = viteEnv
    return {
        root,
        base: VITE_PUBLIC_PATH,
        plugins: createVitePlugins(viteEnv),
        server: {
            host: true,
            port: VITE_PORT,
            proxy: proxyConfig(viteEnv)
        },
        resolve: {
            // 别名
            alias: {
                '@': path.resolve('src'),
                '#': path.resolve('types')
            },
            extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue']
        },
        build: {
            chunkSizeWarningLimit: 4000,
            reportCompressedSize: true,
            sourcemap: false,
            minify: 'terser',
            brotliSize: true,
            terserOptions: {
                compress: {
                    // 删除所有 console
                    drop_console: VITE_DELETE_CONSOLE,
                    // 删除 所有 debugger
                    drop_debugger: true
                }
            }
        }
    }
})
