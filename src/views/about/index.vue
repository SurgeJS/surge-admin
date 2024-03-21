<script lang="ts" setup>
import { SuperTableProps } from '@/components/antd/SuperTable/type'
import { onMounted } from 'vue'

const props = defineProps<SuperTableProps>()
onMounted(() => {
  console.log(props)
  console.log(555)
})
</script>

<template>
  <div />
</template>

<style scoped>

</style>
