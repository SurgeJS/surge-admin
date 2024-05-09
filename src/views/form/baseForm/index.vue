<script lang="tsx" setup>
import { ref } from 'vue'
import { CascaderProps } from 'ant-design-vue'
import { SchemaType } from '@/components/common/SchemaForm/type/props'
import { useToggle } from '@vueuse/core'

const [ isShow,toggleShow ] = useToggle(true)

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
  }
])

const options: CascaderProps['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]

const form = ref({
  Input: 'dsad',
  Select: undefined,
  AutoComplete: undefined,
  Cascader: [],
  Checkbox: false,
  CheckboxGroup: [],
  DatePicker: undefined,
  DateRangePicker: undefined,
  InputNumber: undefined,
  Mentions: undefined,
  Radio: undefined,
  RadioGroup: undefined,
  Rate: undefined,
  Slider: undefined,
  TimePicker: undefined,
  TimeRangePicker: undefined,
  TreeSelect: undefined,
  Upload: undefined
})

const schema = ref<SchemaType<typeof form.value>[]>([
  {
    field: 'Input',
    label: '输入框',
    component: 'Input',
    placeholder: 'Input',
    labelWidth: 150,
    rule: 'mail',
    hide: ({ model }) => {
      return model.Checkbox
    }
  },
  {
    field: 'Select',
    label: '选择器',
    component: 'Select',
    options: status,
    placeholder: 'sss',
    helpMessage: 'sss',
    helpCustomRender: 'sada',
    componentContent(callbackParams) {
      return {
        dropdownRender(menuNode) {
          console.log(menuNode)
          return '21231'
        }
      }
    }
  },
  {
    field: 'AutoComplete',
    label: '自动完成',
    component: 'AutoComplete',
    componentProps: {
      options: status
    }
  },
  {
    field: 'Cascader',
    label: '级联选择',
    component: 'Cascader',
    componentProps: {
      options: status
    }
  },
  {
    field: 'Checkbox',
    label: '复选框',
    component: 'Checkbox',
    componentContent: {
      default() {
        return '12312'
      }
    }
  },
  {
    field: 'CheckboxGroup',
    label: '复选框组',
    component: 'CheckboxGroup',
    componentProps: {
      options: status
    }
  },
  {
    field: 'DatePicker',
    label: '日期选择器',
    component: 'DatePicker',
    componentProps: {
      picker: 'month'
    }
    // valueFormat: 'YYYY-MM-DD'
  },
  {
    field: 'DateRangePicker',
    label: '日期范围选择器',
    component: 'DateRangePicker'
  },
  {
    field: 'InputNumber',
    label: '数字输入框',
    component: 'InputNumber'
  },
  {
    field: 'Mentions',
    label: '提及',
    component: 'Mentions'
  },
  {
    field: 'Radio',
    label: '单选框',
    component: 'Radio'
  },
  {
    field: 'RadioGroup',
    label: '单选框',
    component: 'RadioGroup',
    componentProps: {
      options: status
    }
  },
  {
    field: 'Rate',
    label: '评分',
    component: 'Rate'
  },
  {
    field: 'TreeSelect',
    label: '树选择',
    component: 'TreeSelect',
    componentProps: {
      treeData: status
    }
  },
  {
    field: 'Upload',
    label: '上传',
    component: 'Upload'
  },
  {
    slot: 'action'
  }
])
const test = () => {
  toggleShow()
  console.log(11)
}
</script>

<template>
  <div>
    <a-button @click="test">test</a-button>
    <schema-form
      required
      auto-placeholder
      :schema="schema"
      :model="form"
    >
      <template #action>
        <a-button type="primary">确定</a-button>
      </template>
    </schema-form>
  </div>
</template>

<style lang="scss" scoped>


</style>
