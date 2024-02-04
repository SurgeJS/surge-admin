// 执行策略模式
export const runTacticsAction = (tacticsAction: TacticsAction[]) => tacticsAction.some(([ flag,action ]) => {
    flag && action()
    return flag
})

// 设置CSS变量
export const setCSSVariable = (variable: Record<string,string>) => {
    const htmlElement = document.querySelector('html')
    if (!htmlElement) return
    Object.keys(variable).forEach(key => {
        htmlElement.style.setProperty(`--${ key }`,variable[key])
    })
}

// 获取CSS变量
export const getCSSVariable = (key: string) => {
    return getComputedStyle(document.body).getPropertyValue(`--${ key }`)
}


// 临时清楚过渡效果
export const temporaryClearTransition = (callback: () => void,time: number = 200) => {
    document.body.classList.add('noTransition')
    callback()
    setTimeout(() => {
        document.body.classList.remove('noTransition')
    },time)
}


// 异步等待
export const asyncWait = async (millisecond:number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(undefined)
        },millisecond)
    })
}
