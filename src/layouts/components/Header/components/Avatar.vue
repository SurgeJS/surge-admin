<script lang="ts" setup>
import useAuthStore from '@/store/modules/auth'
import { message } from 'ant-design-vue'

const authStore = useAuthStore()
const signOut = async () => {
  const [ ,error ] = await authStore.signOut()
  if (error) {
    message.warning(error.msg || '接口异常，强制退出登录')
  } else {
    message.success('已退出登录！')
  }
}
</script>

<template>
  <a-dropdown>
    <div class="flex-y-center gap-[10px] cursor-pointer">
      <icon
        icon="i-local:avatar"
        size="36px"
        class="rounded-[5px]"
      />
      <span>admin</span>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>个人中心</a-menu-item>
        <a-menu-item @click="signOut">退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped>

</style>
