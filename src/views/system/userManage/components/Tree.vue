<script setup lang="ts">
import { ref,watch } from 'vue'
import type { TreeProps } from 'ant-design-vue'

const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: 'leaf',key: '0-0-0-0',disableCheckbox: true },
          { title: 'leaf',key: '0-0-0-1' }
        ]
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0',title: 'sss' }]
      }
    ]
  }
]

const expandedKeys = ref<string[]>(['0-0-0','0-0-1'])
const selectedKeys = ref<string[]>(['0-0-0','0-0-1'])
const checkedKeys = ref<string[]>(['0-0-0','0-0-1'])
watch(expandedKeys,() => {
  console.log('expandedKeys',expandedKeys)
})
watch(selectedKeys,() => {
  console.log('selectedKeys',selectedKeys)
})
watch(checkedKeys,() => {
  console.log('checkedKeys',checkedKeys)
})
</script>

<template>
  <a-input class="mb-1" placeholder="请输入关键字" />
  <a-tree
    v-model:expandedKeys="expandedKeys"
    :tree-data="treeData"
  >
    <template #title="{ title, key }">
      <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
      <template v-else>{{ title }}</template>
    </template>
  </a-tree>
</template>

<style scoped lang="scss">

</style>