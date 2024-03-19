<script lang="ts" setup>
import { ref } from 'vue'

const columns = [
  {
    title: '名称',
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
    title: '地址',
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
    <super-table :data-source="dataSource" :columns="columns">
      <template #bodyCell="{column,record}">
        <template v-if="column.dataIndex === 'operation'">
          {{ record }}
        </template>
      </template>
      <template #footer="s">{{ s }}</template>
    </super-table>
  </div>
</template>

<style lang="scss" scoped>


</style>
