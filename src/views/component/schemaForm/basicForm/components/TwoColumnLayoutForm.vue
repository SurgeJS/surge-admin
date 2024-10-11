<script setup lang="ts">
import { DefineSchema } from '@/components/common/SchemaForm/types/type'
import { ref } from 'vue'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'

const message = useMessage()

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
    component: 'Input',
    rule: { message: '请输入名称', max: 10, min: 3, type: 'string', trigger: 'blur', required: true }
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    rule: 'mail'
  },
  {
    field: 'age',
    label: '年龄',
    component: 'InputNumber',
    componentProps: {
      min: 1,
      max: 150
    }
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword'
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
    field: 'skill',
    label: '技能',
    component: 'CheckboxGroup',
    options: [
      {
        label: 'Vue2',
        value: 0
      },
      {
        label: 'Vue3',
        value: 1
      },
      {
        label: 'React',
        value: 3
      },
      {
        label: 'TypeScript',
        value: 4
      },
      {
        label: 'Linux',
        value: 5
      },
      {
        label: 'Docker',
        value: 6
      }
    ]
  },
  {
    field: 'date',
    label: '开始结束日期',
    component: 'DateRangePicker',
    rule: { message: '请选择开始结束日期', trigger: 'change', required: true }
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
  },
  {
    field: 'score',
    label: '评分',
    component: 'Rate'
  },
  {
    label: '自定义插槽',
    contentSlot: 'test'
  },
  {
    slot: 'test2'
  },
  {
    field: 'show',
    label: '是否显示',
    component: 'Switch'
  },
  {
    field: 'description',
    label: '描述',
    component: 'Textarea'
  },
]


const onFinish = (model) => {
  console.log(model)
  message.success('提交成功')
}

const onFinishFailed = () => {
  message.error('校验失败')
}
</script>

<template>
  <schema-form
    :schema="schema1"
    :col-props="12"
    :model="form"
    :on-finish="onFinish"
    :on-finish-failed="onFinishFailed"
  >
    <template #test>
      <div class="text-white bg-primary h-full flex-center">
        这是一个<span class="text-black">包含</span>FormItem自定义插槽
      </div>
    </template>
    <template #test2>
      <div class="text-white bg-primary h-full flex-center">
        这是一个<span class="text-black">不包含</span>FormItem自定义插槽
      </div>
    </template>
  </schema-form>
</template>

<style scoped lang="scss">

</style>