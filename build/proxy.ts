import { ProxyOptions } from 'vite'

// 代理配置
export const proxyConfig = (viteEnv: ImportMetaEnv): Recordable<string | ProxyOptions> => {
    return Object.keys(viteEnv.VITE_API_CONFIG).reduce((proxy, key) => {
        if (typeof viteEnv.VITE_API_CONFIG[key] === 'string') return proxy
        const prefix = viteEnv.VITE_API_CONFIG[key][0]
        const url = viteEnv.VITE_API_CONFIG[key][1]
        proxy[prefix] = {
            target: url,
            changeOrigin: true,
            rewrite: path => path.replace(new RegExp(`^${prefix}`), '')
        }

        return proxy
    }, {})
}
