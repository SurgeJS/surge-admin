<script setup lang="ts">
import RouterConstant from '@/constant/router'

const router = useRouter()
</script>

<template>
  <div>
    <div class="h-full flex flex-col justify-center ">
      <h1 class="mb-[24px]">手机号登录📱</h1>
      <n-button block @click="router.push(RouterConstant.LOGIN_PATH)">密码登录</n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>