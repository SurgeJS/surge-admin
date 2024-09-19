<script lang="ts" setup>
import useAuthStore from '@/store/modules/auth'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

const message = useMessage()
const authStore = useAuthStore()

const actionList = ref<DropdownMixedOption[]>([
  {
    key: 'personalCenter',
    label: '个人中心',
  },
  {
    key: 'logOut',
    label: '退出登录',
  }
])

const signOut = async () => {
  const [ , error ] = await authStore.signOut()
  if (error) {
    message.warning(error.msg || '接口异常，强制退出登录')
  } else {
    message.success('已退出登录！')
  }
}

const handleAction = (key: string) => {
  switch (key) {
    case 'personalCenter':
      break
    case 'logOut':
      signOut()
      break
  }
}
</script>

<template>
  <n-dropdown :options="actionList" @select="handleAction">
    <div class="flex-y-center gap-[10px] cursor-pointer">
      <icon
        icon="i-local:avatar"
        size="30px"
        class="rounded-[5px]"
      />
      <span>admin</span>
    </div>
  </n-dropdown>
</template>

<style scoped>

</style>
