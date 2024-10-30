<script setup lang="ts">

const [ isShow,setShow ] = useToggle()
</script>

<template>
  <div class="w-full">
    <n-button @click="setShow()">是否折叠</n-button>
    <!--    <grid-->
    <!--      class="w-full"-->
    <!--      x-gap="10px"-->
    <!--      :collapsed="isShow"-->
    <!--      :cols="{xs:4,sm:8,md:12,lg:16}"-->
    <!--      y-gap="10px"-->
    <!--    >-->
    <!--      <grid-item-->
    <!--        v-for="item in 100"-->
    <!--        :key="item"-->
    <!--        :span="{xs:2,sm:4,md:6}"-->
    <!--        class="bg-primary rounded-md h-100px"-->
    <!--      >-->
    <!--        {{ item }}-->
    <!--      </grid-item>-->

    <!--      <grid-item-->
    <!--        class="bg-primary rounded-md h-100px"-->
    <!--        span="2"-->
    <!--        suffix-->
    <!--      >-->
    <!--        suffix-->
    <!--      </grid-item>-->
    <!--    </grid>-->

    <n-grid
      x-gap="10"
      y-gap="10"
      cols="5"
      collapsed-rows="2"
      :collapsed="isShow"
    >
      <n-grid-item span="2" class="bg-primary rounded-md h-100px">1</n-grid-item>
      <n-grid-item span="3" class="bg-primary rounded-md h-100px">1</n-grid-item>
      <n-grid-item span="3" class="bg-primary rounded-md h-100px">1</n-grid-item>
      <n-grid-item span="2" class="bg-primary rounded-md h-100px">1</n-grid-item>
      <n-grid-item
        span="1"
        suffix
        class="bg-primary rounded-md h-100px"
      >
        1
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped lang="scss">
div {
  //text-align: center;
}
</style>