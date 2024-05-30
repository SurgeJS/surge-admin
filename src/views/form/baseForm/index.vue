<script lang="tsx" setup>
import { ref } from 'vue'
import { CascaderProps } from 'ant-design-vue'
import { useToggle } from '@vueuse/core'
import { SchemaType } from '@/components/common/SchemaForm/type/props'
import SchemForm from '@/components/common/SchemaForm/index.vue'

const [ isShow,toggleShow ] = useToggle(false)

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
  Input: undefined,
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

const formRef = ref<InstanceType<typeof SchemForm>>()
const schema: SchemaType<typeof form.value>[] = [
  {
    field: 'Input',
    label: '输入框',
    component: 'Input',
    componentProps: {
      prefix() {}
    },
    placeholder: 'Input',
    labelWidth: 150,
    rule: 'mail',
    hide: isShow
  },
  {
    field: 'Select',
    label: '选择器',
    component: 'Select',
    options: status,
    placeholder: 'sss',
    disabled: isShow,
    tooltip: '提示',
    tooltipCustomRender: 'sada'
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
    componentContent(p) {
      return {
        default() {
          return '1231'
        }
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
]

const test = () => {
  toggleShow()
}

</script>

<template>
  <div>
    <a-button @click="test">test</a-button>
    <schema-form
        ref="formRef"
        v-model:model="form"
        :col-props="{span:12}"
        :label-width="100"
        :schema="schema"
    >
      <template #action>
        <a-button type="primary">确定</a-button>
      </template>
    </schema-form>
  </div>
</template>

<style lang="scss" scoped>


</style>
