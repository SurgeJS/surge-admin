<script lang="ts" setup>
import { useLoginContext } from '@/views/login/utils/useLoginContext'
import { reactive,ref } from 'vue'
import useAuthStore from '@/store/modules/auth'
import { useToggle } from '@vueuse/core'
import type { FormInstance,Rule } from 'ant-design-vue/es/form'
import { LoginAction } from '@/views/login/utils/type'

const loginContext = useLoginContext()
const authStore = useAuthStore()
const [ loading,toggleLoading ] = useToggle()

const formRef = ref<FormInstance>()

const form: UserModel.PasswordLoginParams = reactive({
  username: 'admin',
  password: '123456'
})
const rules: Recordable<Rule[]> = {
  username: [
    {
      message: '请输入账号',
      required: true
    }
  ],
  password: [
    {
      message: '请输入密码',
      required: true
    }
  ]
}

const handleLogin = async () => {
  await formRef.value?.validate()
  toggleLoading(true)
  await authStore.passwordLogin(form).finally(() => toggleLoading(false)).catch(e => e)
}
</script>

<template>
  <a-flex gap="middle" vertical>
    <h1>登录</h1>
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <a-form-item name="username">
        <a-input
          v-model:value="form.username"
          placeholder="请输入账号"
          size="large"
        />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="form.password"
          placeholder="请输入密码"
          size="large"
        />
      </a-form-item>
      <a-form-item>
        <a-flex gap="middle" justify="space-between">
          <a-checkbox>记住密码</a-checkbox>
          <a-button type="link">忘记密码？</a-button>
        </a-flex>
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="loading"
          block
          size="large"
          type="primary"
          @click="handleLogin"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <a-flex gap="middle" justify="space-between">
      <a-button block @click="loginContext.setAction(LoginAction.PhoneLogin)">手机号登录</a-button>
      <a-button block @click="loginContext.setAction(LoginAction.QrCodeLogin)">二维码登录</a-button>
      <a-button block @click="loginContext.setAction(LoginAction.Register)">注册</a-button>
    </a-flex>
  </a-flex>
</template>

<style scoped>

</style>
