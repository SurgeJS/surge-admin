<template>
  <div class="w-h-full flex flex-center relative">
    <dynamic-background />
    <n-card
      bordered
      hoverable
      class="w-[70vw] h-[60vh]"
    >
      1
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import PasswordLogin from '@/views/login/components/PasswordLogin.vue'
import PhoneLogin from '@/views/login/components/PhoneLogin.vue'
import QrCodeLogin from '@/views/login/components/QrCodeLogin.vue'
import Register from '@/views/login/components/Register.vue'
import { useProvideLoginContext } from '@/views/login/utils/context'
import DynamicBackground from '@/views/login/components/DynamicBackground.vue'

defineOptions({ name: 'Login' })
// 登录行为
const LOGIN_ACTION = { PasswordLogin, PhoneLogin, QrCodeLogin, Register }

const appStore = useAppStore()
const { currentAction } = useProvideLoginContext()

</script>

<style lang="scss" scoped>

</style>

