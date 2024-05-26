<script lang="tsx" setup>
import { ref } from 'vue'
import { CascaderProps } from 'ant-design-vue'
import { GroupSchemaType,SchemaType,StepSchemaType } from '@/components/common/SchemaForm/type/props'
import { useToggle } from '@vueuse/core'
import useSchemaForm from '@/components/common/SchemaForm/hooks/useSchemaForm'

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
  Input: '',
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
    helpMessage: '提示',
    helpCustomRender: 'sada',
    colProps: {
      span: 24
    },
    componentContent(callbackParams) {
      return {
        dropdownRender(menuNode) {
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
])

const schema2 = ref<SchemaType<typeof form.value>[]>([
  {
    field: 'Input',
    label: '输入框',
    component: 'Input',
    rule: 'mail'
  },
  {
    field: 'Select',
    label: '选择器',
    component: 'Select',
    options: status,
    placeholder: 'sss',
    helpMessage: '提示'
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
  }
])
const { register } = useSchemaForm<typeof form.value>([
  {
    field: 'Input'
  }
])

const groupSchema = ref<GroupSchemaType<typeof form.value>[]>([
  {
    title: '组1',
    helpMessage: 'test',
    hide: (params) => {
      return Boolean(params.model.Select)
    },
    form: [
      {
        field: 'Input',
        label: '输入框',
        component: 'Input',
        rule: 'mail'
      },
      {
        field: 'Select',
        label: '选择器',
        component: 'Select',
        options: status,
        placeholder: 'sss',
        helpMessage: '提示'
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
      }
    ]
  },
  {
    title: 'test1',
    form: [
      {
        field: 'Select',
        label: '选择器',
        component: 'Select',
        options: status,
        placeholder: 'sss',
        helpMessage: '提示'
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
      }
    ]
  }
])
const stepSchema = ref<StepSchemaType<typeof form.value>[]>([
  {
    title: '步骤一',
    description: 'This is a description.',
    form: [
      {
        field: 'Input',
        label: '输入框',
        component: 'Input',
        rule: 'mail'
      },
      {
        field: 'Select',
        label: '选择器',
        component: 'Select',
        options: status,
        placeholder: 'sss',
        helpMessage: '提示'
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
      }
    ]
  },
  {
    title: '步骤二',
    description: 'This is a description.',
    form: [
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
      }
    ]
  },
  {
    title: '步骤三',
    description: 'This is a description.',
    form: [


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
      }
    ]
  }
])

const test = () => {
  toggleShow()
}

const onSearch = () => {
  toggleShow()
  setTimeout(() => {
    toggleShow()
  },1000)
}

const onNext = () => {

}
</script>

<template>
  <div>
    <a-button @click="test">test</a-button>
    <schema-form
      v-model:model="form"
      :col-props="{span:12}"
      :label-width="130"
      :schema="schema"
    >
      <template #action>
        <a-button type="primary">确定</a-button>
      </template>
    </schema-form>
    <div>search</div>
    <a-card>
      <schema-form
        :submit-loading="isShow"
        schema-layout="search"
        :label-width="90"
        :schema="schema2"
        :model="form"
        @search="onSearch"
      />
    </a-card>
    <div>group</div>
    <a-card>
      <schema-form
        :group-schema="groupSchema"
        :submit-loading="isShow"
        :label-width="90"
        schema-layout="group"
        :model="form"
      />
    </a-card>
    <a-card>
      <schema-form
        :step-schema="stepSchema"
        :submit-loading="isShow"
        form-class="w-[80%] m-auto pt-10"
        :label-width="90"
        schema-layout="step"
        :model="form"
        @next="onNext"
      />
    </a-card>
  </div>
</template>

<style lang="scss" scoped>


</style>
