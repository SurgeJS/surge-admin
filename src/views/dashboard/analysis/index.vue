<script lang="ts" setup>

import { TestApi } from '@/services/api/test'

defineOptions({ name: 'DashboardAnalysis' })
const form = ref({
  pageNo: 1,
  pageSize: 10,
  test: 1
})

const { status, isFetching, refetch, data, fetchStatus } = TestApi.useTodoList(form)

watch(data, () => {
  console.log(data.value)
})
</script>

<template>
  <div class="analysis">
    <a-button @click="form.pageNo+=1">+</a-button>
    <a-button @click="form.pageNo-=1">-</a-button>
    <a-button @click="form.test+=1">test</a-button>
    {{ status }}
    {{ fetchStatus }}
    <br>
    <a-button :loading="isFetching" @click="refetch()">
      <!--      <template #icon>-->
      <!--      </template>-->
      <icon icon="i-ant-design:like-filled" />
      <span>2</span>
    </a-button>
    <p v-for="item in data?.list" :key="item.id">{{ item.name }}</p>
  </div>
</template>

<style lang="scss" scoped>
//.analysis {
//  width: 100%;
//  height: 100%;
//  overflow: auto;
//}
</style>
