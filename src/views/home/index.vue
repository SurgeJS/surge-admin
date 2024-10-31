<script setup lang="ts">

const [ isShow,setShow ] = useToggle()
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
console.log(1)
</script>

<template>
  <div class="w-full">
    <n-button @click="setShow()">是否折叠</n-button>
    <grid>
      <grid-item span="2">4</grid-item>
      <grid-item>4</grid-item>
    </grid>
  </div>
</template>

<style scoped lang="scss">

</style>