<template>
  <div class="w-h-full flex">
    <div v-if="!appStore.isMobile" class="w-[50%] h-full bg-primary flex-center">
      <div v-motion-slide-left class="i-local:login full-[80%]" />
    </div>
    <div v-motion-slide-right class="relative flex-1 flex-center">
      <div class="relative w-[95%] max-w-[400px]">
        <component :is="LOGIN_ACTION[currentAction]" v-motion-fade />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import PasswordLogin from '@/views/login/components/PasswordLogin.vue'
import PhoneLogin from '@/views/login/components/PhoneLogin.vue'
import QrCodeLogin from '@/views/login/components/QrCodeLogin.vue'
import Register from '@/views/login/components/Register.vue'
import { useProvideLoginContext } from '@/views/login/utils/context'

defineOptions({ name: 'Login' })
// 登录行为
const LOGIN_ACTION = { PasswordLogin, PhoneLogin, QrCodeLogin, Register }

const appStore = useAppStore()
const { currentAction } = useProvideLoginContext()

</script>

<style lang="scss" scoped>
</style>

