<script setup lang="tsx">
import { ref } from 'vue'
import { SchemaType } from '@/components/common/SchemaForm/types/type'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'
import { message } from 'ant-design-vue'
import { useToggle } from '@vueuse/core'
import { asyncWait } from '@/utils'
import useRenderIcon from '@/hooks/components/useRenderIcon'

const [ isShow, toggleShow ] = useToggle()
const { RenderUnoIcon } = useRenderIcon()
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

const schema: SchemaType<typeof form.value>[] = [
  {
    field: 'name.test',
    label: '名称',
    component: 'Input',
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    componentContent: {
      prefix: () => RenderUnoIcon('i-ant-design:mail-outlined')
    },
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
  },
  {
    field: 'organization',
    label: '自定义Col',
    component: 'Textarea',
    placeholder: '一整行',
    componentProps: {
      rows:5
    },
    colProps: 24
  },
  {
    label: '自定义插槽',
    contentSlot: 'test'
  },
  {
    slot: 'test2'
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
  <div>
    <a-alert
      message="Schema Form（JSON 格式配置表单）"
      type="info"
      show-icon
    >
      <template #description>
        <p>自动化生成表单：通过定义JSON Schema，可以自动生成对应的表单界面，减少了手工编写表单的工作量。</p>
        <p>一致性和标准化：使用统一的JSON Schema描述数据结构，确保表单的一致性和标准化，便于维护和扩展。</p>
        <p>动态性强：表单可以根据Schema动态变化，适应不同的数据结构需求，增强了表单的灵活性。</p>
        <p>可扩展性好：支持自定义组件，便于开发者根据需要扩展表单功能，满足特定业务需求。</p>
      </template>
    </a-alert>
    <br>
    <a-card>
      <search-schema-form
        v-model:model="form"
        :search-loading="isShow"
        :schema="schema"
        :on-finish="onSearch"
      >
        <template #test>
          <div class="text-white bg-red h-full flex-center">这是一个<span class="text-black">包含</span>FormItem自定义插槽</div>
        </template>
        <template #test2>
          <div class="text-white bg-red h-full flex-center">这是一个<span class="text-black">不包含</span>FormItem自定义插槽</div>
        </template>
      </search-schema-form>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
</style>