<script lang="ts" setup>
import { useLoginContext } from '@/views/login/utils/context'
import { reactive, ref } from 'vue'
import useAuthStore from '@/store/modules/auth'
import { useToggle } from '@vueuse/core'
import type { FormInstance } from 'ant-design-vue/es/form'
import { SchemaType } from '@/components/common/SchemaForm/types/type'
import { LoginAction } from '@/views/login/type/enum'
import useRenderIcon from '@/hooks/components/useRenderIcon'

const { setAction } = useLoginContext()!
const authStore = useAuthStore()
const [loading, toggleLoading] = useToggle()
const { RenderUnoIcon } = useRenderIcon()

const formRef = ref<FormInstance>()


const form: UserModel.PasswordLoginParams = reactive({
  username: 'admin',
  password: '123456'
})

const schema = ref<SchemaType<UserModel.PasswordLoginParams>[]>([
  {
    field: 'username',
    placeholder: '请输入用户名',
    component: 'Input',
    componentProps: {
      size: 'large'
    },
    componentContent: {
      prefix: () => RenderUnoIcon('i-ant-design:user-outlined')
    },
    rule: {
      message: '请输入账号',
      required: true
    }
  },
  {
    field: 'password',
    component: 'InputPassword',
    placeholder: '请输入密码',
    componentProps: {
      size: 'large'
    },
    componentContent: {
      prefix: () => RenderUnoIcon('i-ant-design:lock-outlined') 
    },
    rule: {
      message: '请输入密码',
      required: true
    }
  },
  {
    slot: 'action'
  },
  {
    slot: 'submit'
  }
])

const handleLogin = async () => {
  await formRef.value?.validate()
  toggleLoading(true)
  await authStore.passwordLogin(form).finally(() => toggleLoading(false)) 
}
</script>

<template>
  <a-flex gap="middle" vertical>
    <h1>登录</h1>
    <schema-form
      :container="false"
      :model="form"
      hide-action-button
      :schema="schema"
    >
      <template #action>
        <a-flex
          class="mb-4"
          gap="middle"
          align="center"
          justify="space-between"
        >
          <a-checkbox>记住密码</a-checkbox>
          <a-button type="link">忘记密码？</a-button>
        </a-flex>
      </template>
      <template #submit>
        <a-button
          :loading="loading"
          block
          size="large"
          type="primary"
          @click="handleLogin"
        >
          登录
        </a-button>
      </template>
    </schema-form>
    <a-flex gap="middle" justify="space-between">
      <a-button block @click="setAction(LoginAction.PhoneLogin)">手机号登录</a-button>
      <a-button block @click="setAction(LoginAction.QrCodeLogin)">二维码登录</a-button>
      <a-button block @click="setAction(LoginAction.Register)">注册</a-button>
    </a-flex>
  </a-flex>
</template>

<style scoped>

</style>
