// 包装 env
export const wrapperEnv = (envConfig: Recordable): ImportMetaEnv => {
    return Object.keys(envConfig).reduce((env, envKey) => {
        const envValue = envConfig[envKey]
        try {
            const value = JSON.parse(envValue)
            env[envKey] = value
            process.env[envKey] = value
        } catch (err) {
            envConfig[envKey] = envValue
        }
        return env
    }, {} as ImportMetaEnv)
}

