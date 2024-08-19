/**
 * 策略模式 （只要有一个false后面的函数就不执行）
 * [状态, 状态为true时执行的回调函数]
 */
export type TacticsAction = [ boolean, () => void ]

// 执行策略模式
export const runTacticsAction = (tacticsAction: TacticsAction[]) => tacticsAction.some(([ flag, action ]) => {
    flag && action()
    return flag
})

// 设置CSS变量
export const setCSSVariable = (variable: Recordable) => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return
    Object.keys(variable).forEach(key => {
        htmlElement.style.setProperty(`--${ key }`, variable[key])
    })
}

// 获取CSS变量
export const getCSSVariable = (key: string) => {
    return getComputedStyle(document.body).getPropertyValue(`--${ key }`)
}

// 临时清楚过渡效果
export const temporaryClearTransition = (callback: () => void, time: number = 200) => {
    document.body.classList.add('noTransition')
    callback()
    setTimeout(() => {
        document.body.classList.remove('noTransition')
    }, time)
}

// 异步等待
export const asyncWait = async (millisecond: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(undefined)
        }, millisecond)
    })
}

// 对象路径转为数组路径
export const objectPathToArray = (path?: string): string[] => {
    const regex = /[^.[\]]+/g
    const result = path?.match(regex)
    return result || []
}

// 路径转大驼峰
export const pathToPascalCase = (path: string) => path
    .split(/[/_-]/)  // 使用正则表达式分割路径，支持 `/`, `_`, `-`
    .filter(Boolean) // 过滤掉空字符串
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('')

