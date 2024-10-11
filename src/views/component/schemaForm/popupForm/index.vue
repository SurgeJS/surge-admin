<script setup lang="ts">
import { DefineSchema, PopupType } from '@/components/common/SchemaForm/types/type'
import { ref } from 'vue'
import useRenderIcon from '@/hooks/components/useRenderIcon'
import { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect'

const [ visible, setVisible ] = useToggle()
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

const popupType = ref<PopupType>('modal')

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

const schema: DefineSchema<typeof form.value>[] = [
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
      rows: 5
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
const showPopup = (type) => {
  popupType.value = type
  setVisible()
}
</script>

<template>
  <a-card>
    <a-space>
      <a-button @click="showPopup('modal')">打开模态框表单</a-button>
      <a-button @click="showPopup('drawer')">打开抽屉表单</a-button>
    </a-space>
    <popup-schema-form
      v-model:visible="visible"
      v-model:model="form"
      :col-props="12"
      :popup-type="popupType"
      popup-title="弹框表单"
      :schema="schema"
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
    </popup-schema-form>
  </a-card>
</template>

<style scoped lang="scss">

</style>