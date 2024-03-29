<script lang="ts" setup>
// 其他登录方式
const otherLoginMethods = [
  {
    icon: IAntDesignGithubFilled,
    title: 'Github'
  },
  {
    icon: IAntDesignWechatFilled,
    title: '微信'
  },
  {
    icon: IAntDesignAlipayCircleFilled,
    title: '支付宝'
  },
  {
    icon: IAntDesignGoogleCircleFilled,
    title: '谷歌'
  },
  {
    icon: IAntDesignTwitterCircleFilled,
    title: '推特'
  }
]
</script>

<template>
  <a-divider orientation="center">其他登录方式</a-divider>
  <a-flex gap="middle" justify="space-around">
    <a-tooltip
      v-for="item in otherLoginMethods"
      :key="item.icon"
      :title="item.title"
      placement="bottom"
    >
      <component :is="item.icon" class="text-main text-xl cursor-pointer" />
    </a-tooltip>
  </a-flex>
</template>

<style scoped>

</style>
