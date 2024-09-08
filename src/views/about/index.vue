<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { Reactive } from 'vue'

type Avc = Reactive<{
  test: Ref<{ t:number }>
  b:number
}>

const zz = ref({
  t:1
})
const aaa:Avc = {
  test: zz
}

const appStore = useAppStore()
const b = ref({
  test: 1
})
const a = reactive<{
  test: Ref<{ t:number }>
  b:number
}>({
  test: zz,
  z: 1
})

const test = () => {
  // b.value.test = 222
  // appStore.setFullScreenLoading(true)
  a.t.test = 1113
  setTimeout(() => {
    // appStore.setFullScreenLoading(false)
  }, 2000)
}
</script>

<template>
  <div class="w-full h-full">
    <n-flex>
      <n-input placeholder="xxx" />
      <n-button @click="test">test222</n-button>
      {{ a }}
      <br>
      {{ b }}
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
    <p v-for="item in 100">55</p>
  </div>
</template>

<style scoped>

</style>
