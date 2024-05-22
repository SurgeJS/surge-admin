import {createInjectionState} from '@vueuse/core'
import {ref} from 'vue'
import {LoginAction} from '@/views/login/type/enum'


const [useProvideLoginContext, useLoginContext] = createInjectionState(() => {
    // 当前行为
    const currentAction = ref<LoginAction>(LoginAction.PasswordLogin)

    // 设置行为
    const setAction = (action: LoginAction) => {
        currentAction.value = action
    }

    return {currentAction, setAction}
})

export {useProvideLoginContext, useLoginContext}
