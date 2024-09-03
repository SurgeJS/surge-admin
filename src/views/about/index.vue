<script lang="ts" setup>
</script>

<template>
  <div class="w-full h-full">
    <n-flex>
      <n-input placeholder="xxx" />
      <n-button>test222</n-button>
      <n-button type="primary">test222</n-button>
      <span class="p-10px hover:bg-[rgba(255,255,255,.1)]">55</span>
      <span class="p-10px hover:bg-[rgba(255,255,255,.08)]">55</span>
      <span class="p-10px hover:bg-[rgba(255,255,255,.05)]">55</span>

      <span class="p-10px hover:bg-[rgba(50,50,50,.1)]">55</span>
      <span class="p-10px hover:bg-[rgba(0,0,0,.08)]">55</span>
      <span class="p-10px hover:bg-[rgba(0,0,0,.05)]">55</span>
    </n-flex>
    <n-divider>字体颜色梯度</n-divider>
    <n-card class="mt-20px" title="卡片">
      卡片内容
    </n-card>
  </div>
</template>

<style scoped>

</style>
