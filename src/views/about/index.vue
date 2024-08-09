<script lang="ts" setup>
defineOptions({
  name: 'Test',
})
const count = ref(0)
</script>

<template>
  <div class="w-full h-full">
    <a-button @click="count++">test</a-button>
    {{ count }}
  </div>
</template>

<style scoped>

</style>
