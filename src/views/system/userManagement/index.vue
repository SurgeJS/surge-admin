<script lang="ts" setup>
import { ref } from 'vue'
import TestApiHook from '@/services/apiHooks/test'
import { useForm } from 'ant-design-vue/es/form'

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
  name: undefined,
  id: undefined
})

const { resetFields,validateInfos } = useForm(query)
const { data,loading,reload,pagination,antdTableOnChange,resetQuery } = TestApiHook.useGetTodoList(query)

</script>
<template>
  <div class="w-h-full overflow-auto">
    <a-card>
      <a-form layout="inline">
        <a-form-item label="id" v-bind="validateInfos.id">
          <a-input v-model:value="query.id" />
        </a-form-item>
        <a-form-item label="名称" v-bind="validateInfos.name">
          <a-input v-model:value="query.name" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button :loading="loading" @click="reload" type="primary">搜索</a-button>
            <a-button @click="resetQuery(true)">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
    <br>
    <a-card>
      <a-table
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="pagination"
          @change="antdTableOnChange"
      />
    </a-card>
  </div>
</template>
<style scoped>

</style>
