<script setup lang="ts">
import { SchemaType } from '@/components/common/SchemaForm/types/type'
import { faker } from '@faker-js/faker/locale/zh_CN'

const form = ref({
  name: '',
  test2: undefined
})

const nameLabel = ref('test1')

const schema: SchemaType<typeof form.value>[] = [
  {
    field: 'name',
    label: nameLabel,
    component: 'Input'
  },
  {
    field: 'test2',
    label: 'test2',
    component: 'Input',
    placeholder: '当test1不为空的时候可以输入',
    disabled(params) {
      return !params.model.name
    },
  }
]

const modifyLabel = () => {
  nameLabel.value = 'ssssssssss' || faker.person.lastName()
}
const modifyValue = () => {
  form.value.name = faker.person.fullName()
}
</script>

<template>
  <a-space>
    <a-button @click="modifyLabel">修改test1的label名称</a-button>
    <a-button @click="modifyValue">修改test1的值</a-button>
  </a-space>
  <a-divider />
  <schema-form
    :col-props="12"
    :model="form"
    :schema="schema"
  />
</template>

<style scoped lang="scss">

</style>