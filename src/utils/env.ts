// 包装环境变量
export const wrapperMetaEnv = (env?: Recordable): ImportMetaEnv => {
    const metaEnv = env || import.meta.env
    return Object.keys(metaEnv).reduce((env, envKey) => {
        const envValue = metaEnv[envKey]
        try {
            env[envKey] = JSON.parse(envValue)
        } catch (err) {
            metaEnv[envKey] = envValue
        }
        return env
    }, {} as ImportMetaEnv)
}

// 获取url
export const getApiUrl = (key: keyof ViteApiConfig, apiConfig: ViteApiConfig) => {
    const url = apiConfig[key]
    if (!url) {
        console.error(`Api配置错误,未找到该api:${ key }`)
        return undefined
    }
    return typeof url === 'string' ? url : url[0]
}