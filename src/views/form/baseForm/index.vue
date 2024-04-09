<script lang="tsx" setup>
import { ref } from 'vue'
import { Schema } from '@/components/common/SchemaForm/type/props'
import { schemaRenderComponent } from '@/components/common/SchemaForm/utils'

const status = ref([
  {
    value: 'jack',
    label: 'Jack'
  },
  {
    value: 'lucy',
    label: 'Lucy'
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe'
  }
])

const form = ref<Recordable>({
  name: '',
  age: undefined,
  status: undefined
})

const schema = ref<Schema<typeof form.value>>({
  name: {
    label: '姓名',
    renderComponent: schemaRenderComponent('input',{
      placeholder: 'test',
      onInput(value) {
        console.log(form.value.name)
      },
      suffix: (<div class={ 'bg-red' }>123</div>)
    })
  },
  status: {
    label: '状态',
    renderComponent: schemaRenderComponent('select',{
      options: status.value
    })
  },
  age: {
    label: '年龄',
    renderComponent: 'input'
  }
})
const test = () => {
  status.value[2].label = '2333'
}
</script>

<template>
  <div>
    <a-button @click="test">test</a-button>
    <schema-form :schema="schema" :model="form" />
  </div>
</template>

<style lang="scss" scoped>


</style>
