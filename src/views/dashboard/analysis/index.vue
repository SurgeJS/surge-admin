<script lang="ts" setup>

import { TestApi } from "@/services/api/test"

defineOptions({ name: 'DashboardAnalysis' })
const form = ref({
  pageNo: 1,
  pageSize: 10,
  test: 1
})

const { error,isRefetching,refetch } = TestApi.useTodoList(form)
watch(isRefetching, () => {
  console.log(isRefetching)
})
</script>

<template>
  <div class="analysis">
    <a-button @click="form.pageNo+=1">+</a-button>
    <a-button @click="form.pageNo-=1">-</a-button>
    <a-button @click="form.test+=1">test</a-button>
    <a-button :loading="isRefetching" @click="refetch()">
      <template #icon>
        <icon icon="i-material-symbols:10k" />
      </template>
      test2
    </a-button>
  </div>
</template>

<style lang="scss" scoped>
//.analysis {
//  width: 100%;
//  height: 100%;
//  overflow: auto;
//}
</style>
