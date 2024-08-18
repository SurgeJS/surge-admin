// 获取环境变量
export const getMetaEnv = (): ImportMetaEnv => {
    const metaEnv = import.meta.env
    return Object.keys(metaEnv).reduce((env, envKey) => {
        let envValue = metaEnv[envKey]
        // 判断是否是布尔类型
        envValue = envValue === 'true' ? true : envValue === 'false' ? false : envValue
        // 判断是否是数字
        if (!isNaN(parseInt(envValue))) envValue = Number(envValue)
        env[envKey] = envValue
        return env
    }, {} as ImportMetaEnv)
}

// 是否开发环境
export const isDEV = (): boolean => import.meta.env.DEV

// 是否生产环境
export const isPROD = (): boolean => import.meta.env.PROD

// 是否生产环境
export const isSSR = (): boolean => import.meta.env.SSR

// 获取url
export const getApiUrl = (key: keyof ViteApiConfig, apiConfig: ViteApiConfig) => {
    const url = apiConfig[key]
    if (!url) {
        console.error(`Api配置错误,未找到该api:${key}`)
        return undefined
    }
    return typeof url === 'string' ? url : url[0]
}