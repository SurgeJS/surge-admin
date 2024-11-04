<script setup lang="ts">

const [ isShow,setShow ] = useToggle()
</script>

<template>
  <div class="w-full">
    <n-button @click="setShow()">是否折叠</n-button>
    <grid
      :cols="8"
      :x-gap="10"
      :y-gap="10"
    >
      <grid-item
        class="bg-red rounded-md"
        :span="4"
        :offset="4"
      >
        test
      </grid-item>
      <grid-item class="bg-red rounded-md" :span="6" />
      <grid-item
        class="bg-red rounded-md"
        :span="2"
      />
      <grid-item class="bg-red rounded-md" />
      <grid-item class="bg-red rounded-md" :span="5" />
      <grid-item class="bg-red rounded-md" :span="3" />
    </grid>
  </div>
</template>

<style scoped lang="scss">

</style>