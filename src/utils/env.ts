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