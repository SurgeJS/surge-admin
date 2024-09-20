<script setup lang="ts">
import { reactive } from 'vue'
import { DefineSchema } from '@/components/common/SchemaForm/types/type'
import { FormItemRule } from 'naive-ui'

const form = ref({
  name: {
    a: {
      b: ''
    }
  },
  email: '',
  age: undefined,
  password: '',
  confirmPassword: '',
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


const emailAutoComplete = computed(() => [ '@gmail.com', '@163.com', '@qq.com' ].map(v => {
      const prefix = form.value.email.split('@')[0]
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
    showRequireMark: true,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'autoComplete',
    componentProps: {
      options: emailAutoComplete,
    },
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
    componentProps:{
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
    }
  }
])

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
        <pre>{{ JSON.stringify(form, null, 2) }}</pre>
      </div>
    </template>
    <template #2>
      <div class="p-24px h-full overflow-auto">
        <schema-form
          v-model:model="form"
          v-model:schema="schema"
          label-width="80"
        />
      </div>
    </template>
  </n-split>
</template>

<style scoped lang="scss">

</style>