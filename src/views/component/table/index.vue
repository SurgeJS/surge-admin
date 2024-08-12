<script lang="ts" setup>
import { ref } from 'vue'
import { SuperTableColumn } from '@/components/antd/SuperTable/type/props'

const columns = ref<SuperTableColumn[]>([
  {
    title: '用户名称',
    dataIndex: 'name',
    resizable: true,
    width: 100,
    minWidth: 100,
    maxWidth: 200
  },
  {
    title: '年龄',
    dataIndex: 'age'
  },
  {
    title: '生日',
    dataIndex: 'birthday'
  },
  {
    title: '居住地址',
    dataIndex: 'address'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right'
  }
])


const dataSource = ref<Recordable[]>([])

for (let i = 1; i <= 500; i++) {
  dataSource.value.push({
    name: '名称' + i,
    age: i,
    birthday: '生日' + i,
    address: '地址' + i
  })
}
</script>

<template>
  <div>
    <table-wrap
      v-model:columns="columns"
      heading="基础表头"
      bordered
      :data-source="dataSource"
    >
      <template #headerExtra>
        <a-button type="primary">添加</a-button>
      </template>
    </table-wrap>
  </div>
</template>

<style lang="scss" scoped>


</style>
