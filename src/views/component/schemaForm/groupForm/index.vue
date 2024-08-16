<script setup lang="ts">
import { ref } from 'vue'
import { GroupSchemaType } from '@/components/common/SchemaForm/types/type'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'
import { message } from 'ant-design-vue'
import { useToggle } from '@vueuse/core'


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
  description: undefined,
  companyName: undefined,
  companyType: undefined,
  companyDescription: undefined
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
const [ isShow ] = useToggle(true)
const schema1: GroupSchemaType<typeof form.value>[] = [
  {
    title: '基础信息',
    helpMessage: '这是一个帮助信息',
    isHideExpandCollapseButton: true,
    form: [
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
        options: area,
        colProps: { span: 12 }
      },
      {
        field: 'score',
        label: '评分',
        component: 'Rate',
        colProps: { span: 6 }
      },
      {
        field: 'show',
        label: '是否显示',
        component: 'Switch',
        colProps: { span: 6 }
      },
      {
        field: 'description',
        label: '描述',
        component: 'Textarea',
        colProps: { span: 24 }
      }

    ]
  },
  {
    title: '企业信息',
    isFold: isShow,
    disabled: computed(() => Boolean(form.value.show)),
    form: [
      {
        field: 'companyName',
        component: 'Input',
        label: '企业名称',
        disabled: false,
        required: true,
      },
      {
        field: 'companyType',
        component: 'Select',
        label: '企业类型',
        options: status
      },
      {
        field: 'companyDescription',
        component: 'Textarea',
        label: '企业描述',
        colProps: { span: 24 }
      }
    ]
  }
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
  <a-card>
    <group-schema-form
      :schema="schema1"
      :model="form"
      :col-props="12"
      :on-finish="onFinish"
      :on-finish-failed="onFinishFailed"
    />
  </a-card>
</template>

<style scoped lang="scss">

</style>