<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
// const { current } = useBreakpoint()

const { current } = useBreakpoints(breakpointsTailwind)
</script>

<template>
  <div>
    {{ current() }}
  </div>
</template>

<style scoped lang="scss">

</style>