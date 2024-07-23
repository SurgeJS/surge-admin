<script lang="ts" setup>
defineOptions({
  name: "About",
})
const count = ref(0)
const route = useRoute()
</script>

<template>
  <div class="w-full h-full">
    <a-button @click="count++" />
    {{ count }}
    <iframe :src="route.meta.iframeSrc" class="w-full h-full" />
  </div>
</template>

<style scoped>

</style>
