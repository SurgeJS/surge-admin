<script lang="ts" setup>
import { ref } from 'vue'

const columns = [
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
    title: '居住地址',
    dataIndex: 'address'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]


const dataSource = ref<Recordable[]>([])

for (let i = 1; i <= 500; i++) {
  dataSource.value.push({
    name: '名称' + i,
    age: i,
    address: '地址' + i
  })
}
</script>

<template>
  <div class="w-h-full overflow-auto">
    <base-table heading="基础表头" :columns="columns" :data-source="dataSource">
      <template #header-extra>
        <a-button type="primary">添加</a-button>
      </template>
    </base-table>
    <div class="w-[500px] h-[500px] overflow-auto">
      <div class="w-[1000px]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>


</style>
