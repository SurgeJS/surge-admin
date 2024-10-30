<script setup lang="ts">
import Grid from '@/components/common/Grid/Grid.vue'
</script>

<template>
  <div class="w-full">
    <grid
      class="w-full"
      x-gap="10px"
      :cols="{xs:4,sm:8,md:12,lg:16}"
      y-gap="10px"
    >
      <grid-item
        v-for="item in 10"
        :key="item"
        :span="{xs:2,sm:4,md:6}"
        class="bg-primary rounded-md h-100px"
      >
        {{ item }}
      </grid-item>

      <grid-item
        class="bg-primary rounded-md h-100px"
        span="2"
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