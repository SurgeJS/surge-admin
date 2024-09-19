<script setup lang="ts">
import { reactive } from 'vue'
import { DefineSchema, SchemaFormExpose } from '@/components/common/SchemaForm/types/type'
import useAuthStore from '@/store/modules/auth'
import useRenderIcon from '@/hooks/components/useRenderIcon'

const authStore = useAuthStore()

const { RenderUnoIcon } = useRenderIcon()
const [ loading, setLoading ] = useToggle()
const formRef = useTemplateRef<SchemaFormExpose>('formRef')
const router = useRouter()
const otherLogins = ref([
  {
    tooltip:'Github登录',
    icon: 'i-mdi:github',
  },
  {
    tooltip:'微信登录',
    icon: 'i-mdi:wechat',
  },
  {
    tooltip:'QQ登录',
    icon: 'i-mdi:qqchat',
  },
  {
    tooltip:'谷歌登录',
    icon: 'i-mdi:google',
  }
])
const form: UserModel.PasswordLoginParams = reactive({
  username: 'admin',
  password: '123456'
})

const schema = reactive<DefineSchema<UserModel.PasswordLoginParams>[]>([
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
const test = () => {
  console.log(11)
}
</script>

<template>
  <div class="h-full flex flex-col justify-center ">
    <h1 class="mb-[24px]">Hi 欢迎回来👋</h1>
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
          <span class="text-primary cursor-pointer">忘记密码？</span>
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
    <n-flex
      class="w-full mt-[24px]"
      justify="space-between"
      :wrap="false"
    >
      <n-button
        type="primary"
        tertiary
        class="flex-shrink"
        block
        @click="router.push('/auth/phoneLogin')"
      >
        手机号登录
      </n-button>
      <n-button
        type="primary"
        tertiary
        class="flex-shrink"
        block
      >
        二维码登录
      </n-button>
      <n-button
        type="primary"
        tertiary
        class="flex-shrink"
        block
      >
        注册
      </n-button>
    </n-flex>
    <n-divider>第三方登录</n-divider>
    <n-flex justify="center">
      <hover-container
        v-for="item in otherLogins"
        :key="item.icon"
        :tooltip="item.tooltip"
        @click="test"
      >
        <icon size="20px" :icon="item.icon" />
      </hover-container>
    </n-flex>
  </div>
</template>

<style scoped lang="scss">

</style>