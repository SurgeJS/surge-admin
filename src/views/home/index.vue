<script setup lang="ts">

const [ isShow, setShow ] = useToggle()
</script>

<template>
  <div class="w-full">
    <n-button @click="setShow()">是否折叠</n-button>
    <grid
      :cols="8"
      :x-gap="10"
      :y-gap="10"
      :collapsed-rows="2"
      :collapsed="isShow"
    >
      <grid-item :span="{xs:8,sm:4,md:2}" class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">1</grid-item>
      <grid-item class="bg-red rounded-md">2</grid-item>
      <grid-item class="bg-red rounded-md">2</grid-item>
      <grid-item class="bg-red rounded-md">2</grid-item>
      <grid-item class="bg-red rounded-md">2</grid-item>
      <grid-item class="bg-red rounded-md">2</grid-item>
      <grid-item class="bg-red rounded-md">2</grid-item>
      <grid-item
        class="bg-red rounded-md"
        suffix
        #="{overflow}"
      >
        {{ overflow }}
      </grid-item>
    </grid>
  </div>
</template>

<style scoped lang="scss">

</style>