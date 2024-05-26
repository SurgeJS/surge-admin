<script setup lang="ts">
import {
  GroupSchemaType,
  SchemaFormEmits,
  SchemaFormExpose,
  SchemaFormProps,
  SchemaFormSlots,
  SchemaType
} from '@/components/common/SchemaForm/type/props'
import useOmitProps from '@/hooks/common/useOmitProps'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/utils/context'
import { computed,ref } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem.vue'
import { FormInstance } from 'ant-design-vue/es/form'
import { FormLayout } from 'ant-design-vue/es/form/Form'
import { isBoolean,isFunction,omit } from 'lodash-es'

const props = withDefaults(defineProps<SchemaFormProps>(),{
  required: false,
  autoPlaceholder: true,
  defaultDateFormat: 'YYYY-MM-DD',
  defaultTimeFormat: 'HH:mm:ss',
  defaultValueDateFormat: 'YYYY-MM-DD',
  defaultValueTimeFormat: 'HH:mm:ss'
})

const emits = defineEmits<SchemaFormEmits>()

const model = defineModel<Recordable>('model',{ required: true })
// 当前步骤条激活项
const currentStep = defineModel<number>('currentStep',{ default: 0 })
const visible = defineModel<boolean>('visible',{ default: false })

const slots = defineSlots<SchemaFormSlots>()

// 创建可重用的 FormContent
const [ DefineFormContent,FormContent ] = createReusableTemplate<{ schema?: SchemaType[] }>()

// 提供Schema上下文
useProvideSchemaFormContext(props)

const aFormProps = useOmitProps(props,[
  'schema',
  'labelWidth',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultValueDateFormat',
  'defaultValueTimeFormat',
  'required',
  'schemaLayout',
  'autoPlaceholder'
])

// 表单实例
const formRef = ref<FormInstance>()
const drawerContentRef = ref<HTMLDivElement>()

// labelCol配置
const labelCol = computed(() => {
  return props.labelWidth ? { style: { width: `${ props.labelWidth }px` },...props.labelCol } : props.labelCol
})

const formLayout = computed<FormLayout | undefined>(() => {
  if (props.layout) return props.layout
  if (props.schemaLayout === 'search') return 'inline'
  return props.layout
})

// 步骤条选项
const stepsItems = computed(() => props.stepSchema?.map(item => omit(item,[ 'form' ])))

// 重置表单
const onReset = () => {
  formRef.value!.resetFields()
  emits('afterReset')
}

// 查询事件
const onSearch = () => {
  emits('search',formRef.value!.validate,model)
}

// 提交事件
const onSubmit = () => {
  formRef.value!.validate()
      .then(() => emits('submitSuccess',model))
      .catch((err) => emits('submitError',err))
}

const handleGroupHide = (config: GroupSchemaType) => {
  let isHide = true
  if (isBoolean(config.hide)) isHide = !config.hide
  if (isFunction(config.hide)) isHide = !config.hide({ group: config,model: model.value })
  return isHide
}

// 获取当前步骤的Model
const getCurrentStepModel = () => {
  if (!props.stepSchema) return {}

  return props.stepSchema[currentStep.value].form.reduce<Recordable>((currentModel,item) => {
    if (!item.field && !item.modelField) return currentModel
    const field = (item.modelField || item.field) as string
    currentModel[field] = model.value[field]
    return currentModel
  },{})
}

// 上一步
const onPre = () => {
  emits('pre')
  currentStep.value -= 1
}

// 下一步
const onNext = () => {
  const currentModel = getCurrentStepModel()
  formRef.value!.validate()
      .then(() => {
        emits('nextSuccess',currentModel,model.value)
        currentStep.value += 1
      })
      .catch((err) => emits('nextError',err))
}

defineExpose<SchemaFormExpose>({ reset: onReset })
</script>

<template>
  <div class="scheamForm">
    <!--  定义FormContent组件 -->
    <define-form-content v-slot="{schema}">
      <a-row class="w-full" :gutter="schemaLayout==='search'?[0,10]:undefined">
        <template
          v-for="config in schema "
          :key="config.field||config.slot"
        >
          <schema-form-item
            v-if="config.component||config.contentSlot||config.slot"
            :schema-config="config"
          >
            <slot v-if="config.contentSlot" :name="config.contentSlot" />
            <template v-if="config.slot" #[config.slot]>
              <slot :name="config.slot" />
            </template>
          </schema-form-item>
        </template>
        <!-- 搜索按钮（比较特殊，只能放到 row 下面） -->
        <a-flex
          v-if="props.schemaLayout==='search'"
          class="flex-auto"
          gap="10"
          justify="flex-end"
          align="center"
        >
          <slot name="beforeButton" />
          <slot name="customActionButton">
            <a-button @click="onReset">重置</a-button>
            <a-button
              type="primary"
              :loading="props.submitLoading"
              @click="onSearch"
            >
              搜索
            </a-button>
          </slot>
          <slot name="afterButton" />
        </a-flex>
      </a-row>
    </define-form-content>
    <a-steps
      v-if="props.schemaLayout==='step'"
      v-bind="props.stepsProps"
      :current="currentStep"
      :items="stepsItems"
    />
    <a-form
      ref="formRef"
      :class="props.formClass"
      :style="props.formStyle"
      class="form"
      v-bind="aFormProps"
      :layout="formLayout"
      :model="model"
      :label-col="labelCol"
    >
      <!-- 组 -->
      <template v-if="props.schemaLayout==='group'">
        <template v-for="(config,i) in props.groupSchema" :key="i">
          <template v-if="handleGroupHide(config)">
            <slot name="groupTitle" :group-schema="config">
              <div class="flex tracking-wider h-[34px] items-center gap-1 mb-2 ">
                <span class="inline-block w-[5px] h-[60%] bg-primary rounded flex-x-center" />
                {{ config.title }}
                <a-tooltip v-if="config.helpMessage">
                  <template #title>{{ config.helpMessage }}}</template>
                  <i class="i-ant-design:question-circle-outlined text-tertiary full-[14px]" />
                </a-tooltip>
              </div>
            </slot>
            <form-content :schema="config.form" />
          </template>
        </template>
        <a-flex
          gap="10"
          justify="flex-end"
          align="center"
        >
          <slot name="beforeButton" />
          <slot name="customActionButton">
            <a-button @click="onReset">重置</a-button>
            <a-button type="primary" @click="onSubmit">提交</a-button>
          </slot>
          <slot name="afterButton" />
        </a-flex>
      </template>
      <!-- 步骤 -->
      <template v-else-if="props.schemaLayout==='step'">
        <template v-for="(config,i) in props.stepSchema" :key="i">
          <form-content v-show="i === currentStep" :schema="config.form" />
        </template>
        <a-flex
          gap="10"
          justify="flex-end"
          align="center"
        >
          <slot name="beforeButton" />
          <slot name="customActionButton">
            <a-button v-if="currentStep!==0" @click="onPre">上一步</a-button>
            <a-button
              v-if="currentStep+1!==stepsItems?.length"
              type="primary"
              @click="onNext"
            >
              下一步
            </a-button>
          </slot>
          <slot name="afterButton" />
        </a-flex>
      </template>
      <template v-else>
        <form-content :schema="props.schema" />
      </template>
    </a-form>
  </div>
</template>

<style scoped>
.form :global(.ant-form-inline .ant-form-item) {
  margin-inline-end: 0 !important;
}
</style>
