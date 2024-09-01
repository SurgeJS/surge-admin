<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()

</script>

<template>
  <div class="w-h-full overflow-auto">
    {{ themeVars }}
    <p v-for="item in 100" :key="item">{{ item }}</p>
  </div>
</template>

<style scoped lang="scss">

</style>