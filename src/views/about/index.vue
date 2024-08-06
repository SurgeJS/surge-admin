<script lang="ts" setup>

const count = ref(0)
</script>

<template>
  <div class="w-full h-full">
    <a-button @click="count++" />
    {{ count }}
  </div>
</template>

<style scoped>

</style>
