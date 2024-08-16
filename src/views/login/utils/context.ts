import { createInjectionState, useToggle } from '@vueuse/core'
import { ref } from 'vue'
import { LoginAction } from '@/views/login/type/enum'


const [ useProvideLoginContext, useLoginContext ] = createInjectionState(() => {
    const [ loading, setLoading ] = useToggle()

    // 当前行为
    const currentAction = ref<LoginAction>(LoginAction.PasswordLogin)

    // 设置行为
    const setAction = (action: LoginAction) => {
        currentAction.value = action
    }

    return { currentAction, setAction, loading, setLoading }
})

export { useProvideLoginContext, useLoginContext }
