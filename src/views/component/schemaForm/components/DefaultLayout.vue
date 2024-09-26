<script setup lang="ts">
import { reactive } from 'vue'
import { DefineSchema } from '@/components/common/SchemaForm/types/type'
import { FormItemRule } from 'naive-ui'
import useRenderIcon from '@/hooks/components/useRenderIcon'

const { RenderUnoIcon } = useRenderIcon()

const form = ref({
  name: {
    a: {
      b: undefined
    }
  },
  email: undefined,
  age: undefined,
  password: undefined,
  confirmPassword: undefined,
  status: undefined,
  skill: undefined,
  date: null,
  dateRange: [],
  startTime: undefined,
  endTime: undefined,
  area: undefined,
  organization: undefined,
  score: 3,
  show: true,
  description: undefined
})

const emailAutoComplete = computed(() => [ '@gmail.com', '@163.com', '@qq.com' ].map(v => {
      const prefix = form.value.email?.split('@')[0]
      return {
        label: prefix + v,
        value: prefix + v
      }
    })
)

const schema = reactive<DefineSchema<typeof form.value>[]>([
  {
    field: 'name.a.b',
    label: '名称',
    component: 'input',
    tooltip: '这是一个Tooltip',
    placeholder: '这个placeholder会覆盖到自动生成的placeholder',
    componentContent: {
      prefix: () => RenderUnoIcon('i-ant-design:user-outlined')
    },
    showRequireMark: true,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'autoComplete',
    options: emailAutoComplete,
    rule: 'mail'
  },
  {
    field: 'age',
    label: '年龄',
    component: 'inputNumber'
  },
  {
    field: 'password',
    label: '密码',
    component: 'input',
    componentProps: {
      type: 'password',
      showPasswordOn: 'click',
    },
    showRequireMark: true,
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'input',
    first: true,
    componentProps: {
      type: 'password',
      showPasswordOn: 'click',
      disabled: computed(() => !form.value.password)
    },
    rule: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'blur'
      },
      {
        message: '俩次输入密码不一致',
        trigger: [ 'blur', 'input' ],
        validator: (rule: FormItemRule, value: string) => {
          return (
              !!form.value.password
              && form.value.password.startsWith(value)
              && form.value.password.length >= value.length
          )
        },
      },
    ]
  },
  {
    field: 'status',
    label: '状态',
    component:'select',
    options: [
      {
        label:'未完成',
        value:0,
      },
      {
        label:'已完成',
        value:1,
      }
    ]
  },
  {
    field:'date',
    label: '日期',
    vModelBind: 'formattedValue',
    component:'datePicker',
    showRequireMark: true,
  },
  {
    field:'skill',
    label: '技能',
    component:'checkboxGroup',
    options: [
      {
        label:'Vue',
        value:0,
      },
      {
        label:'React',
        disabled: true,
        value:1,
      },
      {
        label:'Naive',
        value:2,
      },
      {
        label:'VueUse',
        value:3,
      },
      {
        label:'VueQuery',
        value:4,
      },
      {
        label:'Axios',
        value:5,
      },
      {
        label:'Unocss',
        value:6,
      },
    ],
    // showRequireMark:true
    // rule:{
    //   required:true,
    //   type: 'array',
    //   message: 'xx',
    //   trigger: 'change',
    // }
  }
])
const test = () => {
  form.value.name.a.b = 111
}
</script>

<template>
  <n-split
    direction="horizontal"
    :default-size="0.25"
    :max="0.75"
    :min="0.25"
  >
    <template #1>
      <div class="p-24px h-full overflow-auto">
        <n-button type="primary" @click="test">xxx</n-button>
        <pre>{{ JSON.stringify(form, null, 2) }}</pre>
      </div>
    </template>
    <template #2>
      <div class="p-24px h-full overflow-auto">
        <schema-form
          v-model:model="form"
          v-model:schema="schema"
          show-require-mark
          label-width="80"
        />
      </div>
    </template>
  </n-split>
</template>

<style scoped lang="scss">

</style>