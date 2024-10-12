<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import Test from './test.vue'
import { Reactive, ref } from 'vue'
import { format } from 'date-fns'

type Avc = Reactive<{
  test: Ref<{ t: number }>
  b: number
}>

const zz = ref({
  t: 1
})
const aaa: Avc = {
  test: zz
}

const appStore = useAppStore()
const b = ref({
  test: 1
})
const a = reactive<{
  test: Ref<{ t: number }>
  b: number
}>({
  test: zz,
  z: 1
})


const value = ref()

const test = () => {
  // b.value.test = 222
  // appStore.toggleFullScreenLoading(true)
  console.log(value.value)
}

const handle = (v) => {
  console.log(v)
}
console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
</script>

<template>
  <div class="w-full h-full">
    <n-flex>
      <n-date-picker value-format="T" />
      <n-input v-model:value.number="value" />
      <n-button @click="test">test222</n-button>
      {{ value }}
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
      <n-form>
        <n-grid :x-gap="10">
          <n-form-item-gi :span="12" label="tet">
            <n-input />
          </n-form-item-gi>
          <test />
        </n-grid>
      </n-form>
    </n-card>
    <p v-for="item in 100">55</p>
  </div>
</template>

<style scoped>

</style>
