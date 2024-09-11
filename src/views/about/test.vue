<script setup lang="ts">
import { MaybeRef, UnwrapRef } from 'vue'

interface Test {
  name: string
  age: MaybeRef<number>
}

const model = defineModel<UnwrapRef<Test>>()
// model.value?.age.
</script>

<template>
  <div>1</div>
</template>

<style scoped lang="scss">

</style>