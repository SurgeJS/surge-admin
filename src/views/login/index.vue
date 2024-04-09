<template>
  <div class="w-h-full flex">
    <div v-if="!appStore.base.isMobile" class="w-[50%] h-full bg-primary flex-center">
      <div class="i-local:login full-[80%]" />
    </div>
    <div class="relative flex-1 flex-center">
      <theme-switch class="full-[24px] absolute right-[15px] top-[15px]" />
      <div class="relative w-[95%] max-w-[400px]">
        <transition :name="appStore.base.pageAnimationMode" mode="out-in">
          <component :is="LOGIN_ACTION[loginContext.currentLoginAction]" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLoginContext } from '@/views/login/utils/useLoginContext'
import useAppStore from '@/store/modules/app'
import PasswordLogin from '@/views/login/components/PasswordLogin.vue'
import PhoneLogin from '@/views/login/components/PhoneLogin.vue'
import QrCodeLogin from '@/views/login/components/QrCodeLogin.vue'
import Register from '@/views/login/components/Register.vue'
import ThemeSwitch from '@/views/login/components/ThemeSwitch.vue'

defineOptions({ name: 'Login' })
// 登录行为
const LOGIN_ACTION = { PasswordLogin,PhoneLogin,QrCodeLogin,Register }

const appStore = useAppStore()
const loginContext = useLoginContext()

// 首次进入先重置
loginContext.$reset()
</script>

<style lang="scss" scoped>
</style>

