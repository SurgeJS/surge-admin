<script generic="T" lang="ts" setup>

defineOptions({ name: 'BaseForm' })
//
// const columns = [
//   {
//     title: '名称',
//     dataIndex: 'name',
//     width: 50,
//     resizable: true
//   },
//   {
//     title: '年龄',
//     dataIndex: 'age',
//     width: 50
//   },
//   {
//     title: '地址',
//     dataIndex: 'address',
//     width: 50
//   },
//   {
//     title: '操作',
//     dataIndex: 'operation',
//     width: 50
//   }
// ]
// const data = []
//
//
// const dataSource = ref(data)
//
// function handleResizeColumn(w,col) {
//   col.width = w
// }

</script>

<template>
  <div>
<!--    <base-table-->
<!--        :columns="columns" :data-source="dataSource" heading="表格标题"-->
<!--        @resize-column="handleResizeColumn" />-->
    <div class="w-[500px] h-[500px] bg-white overflow-auto">
      <LazyLoad v-for="item in 20" :key="item" v-slot="{isVisible}">
        <div class="bg-red-200 mb-1.5 h-[40px]">
          <span v-if="isVisible">511</span>
        </div>
      </LazyLoad>
    </div>
  </div>
</template>

<style lang="scss" scoped>


</style>
