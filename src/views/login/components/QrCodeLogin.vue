<script lang="ts" setup>
import { useLoginContext } from '@/views/login/utils/context'
import { LoginAction } from '@/views/login/type/enum'

const { setLoginAction } = useLoginContext()!
</script>

<template>
  <a-flex
    align="center"
    gap="middle"
    vertical
  >
    <h1>二维码登录</h1>
    <img
      alt=""
      height="250"
      src="../../../assets/images/login-qrCode.png"
      width="250"
    >
    <p class="text-secondary">扫码点击“确定”，即可完成登录</p>
    <a-button block @click="setLoginAction(LoginAction.PasswordLogin)">返回</a-button>
  </a-flex>
</template>

<style scoped>

</style>
