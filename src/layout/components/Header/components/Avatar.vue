<script lang="ts" setup>
import useAuthStore from '@/store/modules/auth'
import { message } from 'ant-design-vue'

const authStore = useAuthStore()
const signOut = async () => {
  const data = await authStore.signOut()
  if (data.code === 200) {
    message.success('已退出登录！')
  } else {
    message.warning(data.msg || '接口异常，强制退出登录')
  }
}
</script>

<template>
  <a-dropdown>
    <div class="flex-y-center gap-[10px] cursor-pointer">
      <a-avatar :size="32" shape="square">
        <template #icon>
          <i-local-avatar class="w-[32px] h-[32px]" />
        </template>
      </a-avatar>
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
