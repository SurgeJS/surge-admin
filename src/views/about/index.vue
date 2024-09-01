<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { generate, presetPalettes } from '@ant-design/colors'

defineOptions({
  name: 'Test',
})
const count = ref(0)
const appStore = useAppStore()
const palette = generate('#6675ff', {
  theme: 'dark',
})
console.log(presetPalettes)
console.log(palette)
const test = () => {
  appStore.setFullScreenLoading(true)
  setTimeout(() => {
    appStore.setFullScreenLoading(false)
  }, 2000)
}
onMounted(() => {
  console.log(111)
  test()
})
</script>

<template>
  <div class="w-full h-full">
    <a-button @click="test">test</a-button>
    <a-button @click="count++">test222</a-button>
    {{ count }}
    <p
      v-for="(item,i) in 100"
      :key="item"
      :style="{background:palette[i]}"
    >
      {{ item }}
    </p>
  </div>
</template>

<style scoped>

</style>
