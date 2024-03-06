<template>
  <div class="w-h-full overflow-auto">
    <a-card>
      <a-form layout="inline">
        <a-form-item label="id" name="id">
          <a-input v-model:value="query.id" />
        </a-form-item>
        <a-form-item label="名称" name="name">
          <a-input v-model:value="query.name" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary">搜索</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
    <br>
    <a-card>
      <a-table
          :columns="columns"
          :data-source="data?.list"
          :loading="isFetching"
          :pagination="pagination"
          size="small"
          @change="tableChange" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { TestApi } from '@/services/api/test'
import { computed,ref } from 'vue'

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
  pageSize: 10,
  pageNo: 2,
  name: '',
  id: null
})

const pagination = computed(() => ({
  total: data?.value?.total,
  current: query.value.pageNo,
  pageSize: query.value.pageSize
}))

const { isLoading,data,refetch,isFetching } = TestApi.useGetTodoList(query)


const reset = () => {
  refetch()
}

const tableChange = (pag: { pageSize: number;current: number }) => {
  query.value.pageNo = pag.current
  query.value.pageSize = pag.pageSize
}
</script>

<style scoped>

</style>
