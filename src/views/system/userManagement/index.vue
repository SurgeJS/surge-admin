<template>
  <div class="w-h-full overflow-auto">
    <a-button @click="test">{{ isFetching }}</a-button>
    <a-button @click="reRequest">重新请求</a-button>
    <a-table
        @change="tableChange"
        :pagination="pagination"
        size="small"
        :columns="columns"
        :data-source="data?.list"
        :loading="isFetching" />
  </div>
</template>

<script lang="ts" setup>
import { TestApi } from '@/services/api/test'
import { computed } from 'vue'
import useFormQuery from '@/hooks/common/useFormQuery'

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

const { query,$reset } = useFormQuery({
  pageSize: 10,
  pageNo: 2,
  name: null,
  id: null
})

const pagination = computed(() => ({
  total: data?.value?.total,
  current: query.value.pageNo,
  pageSize: query.value.pageSize
}))

const { isLoading,data,refetch,isFetching } = TestApi.useGetTodoList(pagination,query)

const test = () => {
  query.value.pageSize = 2
}

const reRequest = () => {
  refetch()
}

const tableChange = (pag: { pageSize: number;current: number }) => {
  query.value.pageNo = pag.current
  query.value.pageSize = pag.pageSize
}
</script>

<style scoped>

</style>
