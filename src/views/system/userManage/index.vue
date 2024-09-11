<script lang="ts" setup>
import Tree from '@/views/system/userManage/components/Tree.vue'
import { DefineSchema } from '@/components/common/SchemaForm/types/type'
import { asyncWait } from '@/utils'
import { message } from 'ant-design-vue'
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'

const [ isShow, toggleShow ] = useToggle()

const form = ref({
  name: {
    test: undefined
  },
  email: undefined,
  age: undefined,
  password: undefined,
  status: 0,
  skill: undefined,
  date: [],
  startTime: undefined,
  endTime: undefined,
  area: undefined,
  organization: undefined,
  score: 3,
  show: true,
  description: undefined
})

const status = ref([
  {
    value: 0,
    label: '未解决'
  },
  {
    value: 1,
    label: '已解决'
  },
  {
    value: 2,
    label: '解决中',
    disabled: true
  },
  {
    value: 3,
    label: '失败'
  }
])

const area: DefaultOptionType[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门'
          }
        ]
      }
    ]
  }
]

const schema1: DefineSchema<typeof form.value>[] = [
  {
    field: 'name.test',
    label: '名称',
    component: 'Input'
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input'
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    options: status
  },
  {
    field: 'startTime',
    label: '开始时间',
    component: 'TimePicker'
  },
  {
    field: 'endTime',
    label: '结束时间',
    component: 'TimePicker'
  },
  {
    field: 'date',
    label: '开始结束日期',
    component: 'DateRangePicker'
  },
  {
    field: 'area',
    label: '地区',
    component: 'Cascader',
    options: area
  },
  {
    field: 'organization',
    label: '组织机构',
    component: 'TreeSelect',
    options: area
  }
]
const onSearch = async () => {
  toggleShow()
  await asyncWait(2000)
  toggleShow()
  message.success('搜索成功')
}
</script>
<template>
  <div class="h-full flex gap-col-4">
    <a-card class="w-[250px]">
      <tree />
    </a-card>
    <div class="flex-1">
      <schema-form
        v-model:model="form"
        schema-layout="search"
        :submit-loading="isShow"
        label-width="100"
        :schema="schema1"
        @search="onSearch"
      />
    </div>
  </div>
</template>
<style scoped>

</style>
