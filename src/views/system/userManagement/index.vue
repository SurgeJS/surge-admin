<template>
  <div>
    <a-table :columns="columns" :data-source="data?.result" :loading="isPending" />
    <a-button @click="test">{{ isLoading }}</a-button>
    <a-button @click="reRequest">重新请求</a-button>
  </div>
</template>

<script lang="ts" setup>
import { TestApi } from '@/services/api/test'
import { ref } from 'vue'

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  }
]

const query = ref({
  pageSize: 10,pageNo: 1,name: null,id: null
})

const { isLoading,data,refetch,isPending } = TestApi.useGetTodoList(query)

const test = () => {
  query.value.pageSize = 2
}
const reRequest = () => {
  refetch()
}
</script>

<style scoped>

</style>
