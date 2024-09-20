<script setup lang="tsx">
import { DefineSchema } from '@/components/common/SchemaForm/types/type'
import { ComponentsName } from '@/components/common/SchemaForm/types/component'
import { reactive } from 'vue'

const message = useMessage()

const form = ref({
  name: {
    a:{
      b:undefined
    }
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
const area = [
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

const label = ref('名称')
const com = ref<ComponentsName>('input')

const schema = reactive<DefineSchema<typeof form.value>[]>([
  {
    label: (s) => {
      return label.value
    },
    component: com,
    field: 'name.test',
    tooltip: 'xxx',
    componentProps: {
      options: [],
    },
    rule: { message: '请输入名称', max: 10, min: 3, type: 'string', trigger: 'blur', required: true }
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'select',
    componentProps: {
      placeholder: label,
      options: [],
    },
    rule: 'mail'
  },
  // {
  //   field: 'age',
  //   label: '年龄',
  //   component: 'inputNumber',
  //   componentProps: {
  //     min: ref(1)
  //   }
  // },
  // {
  //   field: 'password',
  //   label: '密码',
  //   component: 'input',
  //   componentProps: {}
  // },
  {
    field: 'status',
    label: '状态',
    component: 'select',
    componentProps: {
      options: status,
    }
  },
  // {
  //   field: 'startTime',
  //   label: '开始时间',
  //   vModelBind: 'formattedValue',
  //   component: 'timePicker',
  //   componentProps: {}
  // },
  // {
  //   field: 'endTime',
  //   label: '结束时间',
  //   component: 'timePicker'
  // },
  // {
  //   field: 'skill',
  //   label: '技能',
  //   component: 'checkboxGroup',
  //   componentProps: {},
  //   componentContent: (<n-checkbox value="Beijing" label="北京"/>)
  // },
  // {
  //   field: 'date',
  //   label: '开始结束日期',
  //   component: 'datePicker',
  //   componentProps: {
  //     type: 'daterange'
  //   },
  //   rule: { message: '请选择开始结束日期', trigger: 'change', required: true }
  // },
  {
    field: 'area',
    label: '地区',
    component: 'cascader',
    componentProps: {
      options: area
    },
  },
  // {
  //   field: 'organization',
  //   label: '组织机构',
  //   component: 'treeSelect',
  //   componentProps: {
  //     options: area
  //   }
  // },
  // {
  //   field: 'score',
  //   label: '评分',
  //   component: 'rate'
  // },
  // {
  //   label: '自定义插槽',
  //   contentSlot: 'test'
  // },
  // {
  //   slot: 'test2'
  // },
  // {
  //   field: 'show',
  //   label: '是否显示',
  //   component: 'switch'
  // },
  // {
  //   field: 'description',
  //   label: '描述',
  //   component: 'input',
  //   componentProps: {
  //     type: 'textarea'
  //   }
  // },
])
console.log(schema)
const onFinish = (model) => {
  console.log(model)
  label.value = '889441615'
  message.success('提交成功')
}

const onFinishFailed = () => {
  label.value = '889441615'
  com.value = 'select'
  message.error('校验失败')
}

</script>

<template>
  <n-flex :wrap="false">
    <pre class="w-300px">{{ JSON.stringify(form, null, 4) }}</pre>

    <div class="flex-1">
      <n-button @click="label='8888888'">测试</n-button>
      <schema-form
        v-model:schema="schema"
        v-model:model="form"
        :on-finish="onFinish"
        :on-finish-failed="onFinishFailed"
      >
        <template #test>
          <div class="text-white bg-red h-full flex-center">
            这是一个<span class="text-black">包含</span>FormItem自定义插槽
          </div>
        </template>
        <template #test2>
          <div class="text-white bg-red h-full flex-center">
            这是一个<span class="text-black">不包含</span>FormItem自定义插槽
          </div>
        </template>
      </schema-form>
    </div>
  </n-flex>
</template>

<style scoped lang="scss">

</style>