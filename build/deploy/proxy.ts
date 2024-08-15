import { ProxyOptions } from 'vite'

// 代理配置
export const proxyConfig = (viteEnv: ImportMetaEnv): Recordable<string | ProxyOptions> => ({
    [viteEnv.VITE_PROXY_PATH]: {
        target: viteEnv.VITE_API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp(`^${viteEnv.VITE_PROXY_PATH}`), '')
    }
})
