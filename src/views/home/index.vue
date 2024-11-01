<script setup lang="ts">

const [ isShow,setShow ] = useToggle()
</script>

<template>
  <div class="w-full">
    <n-button @click="setShow()">是否折叠</n-button>
    <grid
      :cols="8"
      x-gap="10px"
      y-gap="10px"
    >
      <grid-item class="bg-red rounded-md" span="2" />
      <grid-item class="bg-red rounded-md" span="2" />
      <grid-item class="bg-red rounded-md" span="2" />
      <grid-item class="bg-red rounded-md">2</grid-item>
      <grid-item class="bg-red rounded-md" span="5" />
      <grid-item class="bg-red rounded-md" span="3" />
      <grid-item class="bg-red rounded-md" span="3" />
      <grid-item class="bg-red rounded-md" span="3" />
      <grid-item class="bg-red rounded-md" :span="{xs:8,md:4}" />
    </grid>
  </div>
</template>

<style scoped lang="scss">

</style>