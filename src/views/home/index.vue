<script setup lang="ts">
import Grid from '@/components/common/Grid/Grid.vue'
</script>

<template>
  <div class="w-full">
    <grid
      class="w-full"
      cols="6"
      x-gap="10px"
      y-gap="10px"
    >
      <grid-item
        v-for="item in 10"
        :key="item"
        :span="2"
        class="bg-primary rounded-md h-100px"
      >
        {{ item }}
      </grid-item>

      <grid-item
        class="bg-primary rounded-md h-100px"
        suffix
      >
        suffix
      </grid-item>
    </grid>
  </div>
</template>

<style scoped lang="scss">
div {
  //text-align: center;
}
</style>