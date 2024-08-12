<script setup lang="ts">
import DefaultForm from '@/views/component/schemaForm/basicForm/components/DefaultForm.vue'
import TwoColumnLayoutForm from '@/views/component/schemaForm/basicForm/components/TwoColumnLayoutForm.vue'
import ComplexLayoutForm from '@/views/component/schemaForm/basicForm/components/ComplexLayoutForm.vue'
import DynamicForm from '@/views/component/schemaForm/basicForm/components/DynamicForm.vue'

const tabs = ref([
  {
    key: 1,
    label:'默认布局',
    component:shallowRef(DefaultForm)
  },
  {
    key: 2,
    label:'两栏布局',
    component:shallowRef(TwoColumnLayoutForm)
  },
  {
    key: 3,
    label:'复杂布局',
    component:shallowRef(ComplexLayoutForm)
  },
  {
    key: 4,
    label:'动态表单',
    component:shallowRef(DynamicForm)
  }
])
</script>
<template>
  <a-card>
    <a-tabs>
      <a-tab-pane
        v-for="item in tabs"
        :key="item.key"
        :tab="item.label"
      >
        <component :is="item.component" :key="item.key" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<style scoped lang="scss">

</style>