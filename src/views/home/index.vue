<script setup lang="ts">

const test = ref()
onMounted(() => {
  console.dir(test)
})
</script>

<template>
  <div>
    <n-button @click="test='55555555555555555555'">test</n-button>
    <div ref="test" class="test">555555555555555555</div>
  </div>
</template>

<style scoped lang="scss">
.test{
  white-space: nowrap;       /* 防止文本换行 */
  overflow: hidden;          /* 超出部分隐藏 */
  text-overflow: ellipsis;   /* 溢出的文本显示省略号 */
  width: 50px;
}
</style>