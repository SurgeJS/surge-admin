import { createInjectionState } from '@vueuse/core'
import { ref } from 'vue'
import { LoginAction } from '@/views/login/type/enum'


const [ useProvideLoginContext,useLoginContext ] = createInjectionState(() => {
  const currentLoginAction = ref<LoginAction>(LoginAction.PasswordLogin)

  // 设置登录行为
  const setLoginAction = (action: LoginAction) => {
    currentLoginAction.value = action
  }

  return { currentLoginAction,setLoginAction }
})

export { useProvideLoginContext,useLoginContext }
