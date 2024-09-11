<script lang="ts" setup>
import { useLoginContext } from '@/views/login/utils/context'
import { reactive, ref } from 'vue'
import useAuthStore from '@/store/modules/auth'
import { DefineSchema, SchemaFormExpose } from '@/components/common/SchemaForm/types/type'
import { LoginAction } from '@/views/login/type/enum'
import useRenderIcon from '@/hooks/components/useRenderIcon'

const { setAction, loading, setLoading } = useLoginContext()!
const authStore = useAuthStore()

const { RenderUnoIcon } = useRenderIcon()

const formRef = ref<SchemaFormExpose>()

const form: UserModel.PasswordLoginParams = reactive({
  username: 'admin',
  password: '123456'
})

const schema = ref<DefineSchema<UserModel.PasswordLoginParams>[]>([
  {
    field: 'username',
    component: 'input',
    componentProps: {
      size: 'large',
      placeholder: '请输入用户名'
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
    component: 'input',
    componentProps: {
      size: 'large',
      type: 'password',
      placeholder: '请输入密码'
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
  setLoading(true)
  await authStore.passwordLogin(form).finally(() => setLoading(false))
}
</script>

<template>
  <n-flex gap="middle" vertical>
    <h1>登录</h1>
    <schema-form
      ref="formRef"
      :model="form"
      hide-action-button
      show-require-mark
      :schema="schema"
    >
      <template #action>
        <a-flex
          class="mb-4"
          gap="middle"
          align="center"
          justify="space-between"
        >
          <n-checkbox>记住密码</n-checkbox>
          <span class="text-primary">忘记密码？</span>
        </a-flex>
      </template>
      <template #submit>
        <n-button
          :loading="loading"
          block
          size="large"
          type="primary"
          @click="handleLogin"
        >
          登录
        </n-button>
      </template>
    </schema-form>
    <n-flex justify="space-between" :wrap="false">
      <n-button
        class="flex-shrink"
        block
        @click="setAction(LoginAction.PhoneLogin)"
      >
        手机号登录
      </n-button>
      <n-button
        class="flex-shrink"
        block
        @click="setAction(LoginAction.QrCodeLogin)"
      >
        二维码登录
      </n-button>
      <n-button
        class="flex-shrink"
        block
        @click="setAction(LoginAction.Register)"
      >
        注册
      </n-button>
    </n-flex>
  </n-flex>
</template>

<style scoped>

</style>
