<script setup lang="ts">
import {
  GroupSchemaType,
  SchemaFormEmits,
  SchemaFormExpose,
  SchemaFormProps,
  SchemaFormSlots,
  SchemaLayout,
  SchemaType
} from '@/components/common/SchemaForm/types/type'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/utils/context'
import { computed,ref } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { FormInstance } from 'ant-design-vue/es/form'
import { isBoolean,isFunction,omit,set } from 'lodash-es'
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem.vue'
import { Modal } from 'ant-design-vue'

const props = withDefaults(defineProps<SchemaFormProps>(),{
  required: false,
  autoPlaceholder: true,
  autoLabelWidth: true,
  hideActionButton: false,
  maskClosable: true,
  closeResetModel: true,
  closeConfirm: true,
  container: 'card',
  defaultDateFormat: 'YYYY-MM-DD',
  defaultTimeFormat: 'HH:mm:ss',
  defaultValueDateFormat: 'YYYY-MM-DD',
  defaultValueTimeFormat: 'HH:mm:ss',
  confirmTitle: '关闭提示',
  confirmContent: '您确定要关闭它吗？',
  drawerProps: () => ({ width: 500 }),
  modalProps: () => ({ width: 800 })
})

const emits = defineEmits<SchemaFormEmits>()

// 当前步骤条激活项
const currentStep = defineModel<number>('currentStep',{ default: 0 })
const visible = defineModel<boolean>('visible',{ default: false })
const model = defineModel<Recordable>('model',{ required: true })

const slots = defineSlots<SchemaFormSlots>()

const [ DefineFormContent,FormContent ] = createReusableTemplate<{ schema?: SchemaType[] }>()
const [ DefineSchemaForm,SchemaForm ] = createReusableTemplate()
const [ DefineButtonAction,ButtonAction ] = createReusableTemplate<{ schemaLayout?: SchemaLayout }>()

// 提供Schema上下文
const { aFormProps,getModelValue,maxLabelWidth } = useProvideSchemaFormContext(props,model)

// 表单实例
const formRef = ref<FormInstance>()

const currentVisibleSchemas = computed({
  get() {
    return props.schema
  },
  set() {

  }
})

const formClassObj = computed(() => {
  return {
    form: true,
    search: props.schemaLayout === 'search'
  }
})

const labelWidth = computed(() => {
  if (props.labelWidth) return props.labelWidth


  if (props.autoLabelWidth) return maxLabelWidth.value

  return null
})

// labelCol配置
const labelCol = computed(() => {
  return labelWidth.value ? { style: { width: `${ labelWidth.value }px` },...props.labelCol } : props.labelCol
})

// 步骤条选项
const stepsItems = computed(() => props.stepSchema?.map(item => omit(item,[ 'form' ])))

// 查询事件
const onSearch = () => {
  emits('search',formRef.value!.validate,model.value)
}

// 提交事件
const onSubmit = () => {
  formExpose.validate()
      .then(() => emits('submitSuccess',model.value))
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

  return props.stepSchema[currentStep.value]?.form.reduce<Recordable>((currentModel,item) => {
    if (!item.field) return currentModel
    const field = item.field as string
    set(currentModel,field,getModelValue(field))
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
  formExpose.validate()
      .then(() => {
        emits('nextSuccess',currentModel,props.model)
        currentStep.value += 1
      })
      .catch((err) => emits('nextError',err))
}

const formExpose: SchemaFormExpose = {
  validate(nameList) {
    return formRef.value!.validate(nameList)
  },
  resetFields() {
    formRef.value!.resetFields()
    emits('afterReset')
  }
}

// 关闭弹框并重置表单
const closeAndReset = () => {
  props.closeResetModel && formExpose.resetFields()
  visible.value = false
}

const onCancel = (e) => {
  console.log(e)
  if (props.closeConfirm) {
    Modal.confirm({
      title: props.confirmTitle,
      content: props.confirmContent,
      centered: true,
      onOk() {
        closeAndReset()
      },
      onCancel() {
        visible.value = true
      }
    })
  } else if (props.maskClosable) {
    closeAndReset()
  }
}
console.log(aFormProps.value)
defineExpose<SchemaFormExpose>(formExpose)
</script>

<template>
  <!--  定义FormContent组件 -->
  <define-form-content v-slot="{schema}">
    <a-row class="w-full" :gutter="schemaLayout==='search'?[12,12]:undefined">
      <template
          v-for="config in schema "
          :key="config.field||config.slot"
      >
        <schema-form-item ref="formItemsRef"
                          v-if="config.component||config.contentSlot||config.slot"
                          :schema="config as any"
        >
          <slot v-if="config.contentSlot" :name="config.contentSlot" />
          <template v-if="config.slot" v-slot:[config.slot]>
            <slot :name="config.slot" />
          </template>
        </schema-form-item>
      </template>
      <a-col class="flex-auto">
        <button-action v-if="props.schemaLayout==='search'" />
      </a-col>
    </a-row>
  </define-form-content>

  <!--  定义Form  -->
  <define-schema-form>
    <a-steps
        v-if="props.schemaLayout==='step'"
        v-bind="props.stepsProps"
        :current="currentStep"
        :items="stepsItems"
    />
    <a-form
        ref="formRef"
        :class="formClassObj"
        :style="props.formStyle"
        v-bind="aFormProps"
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
                <span class="font-bold">{{ config.title }}</span>
                <a-tooltip v-if="config.helpMessage">
                  <template #title>{{ config.helpMessage }}}</template>
                  <i class="i-ant-design:question-circle-outlined text-tertiary full-[14px]" />
                </a-tooltip>
              </div>
            </slot>
            <form-content :schema="config.form" />
          </template>
        </template>
        <button-action v-if="props.container=='card'" />
      </template>
      <!-- 步骤 -->
      <template v-else-if="props.schemaLayout==='step'">
        <template v-for="(config,i) in props.stepSchema" :key="i">
          <form-content v-show="i === currentStep" :schema="config.form" />
        </template>
        <button-action v-if="props.container=='card'" />
      </template>
      <template v-else>
        <form-content :schema="props.schema" />
        <button-action v-if="props.container=='card'&&props.schemaLayout!=='search'" />
      </template>
    </a-form>
  </define-schema-form>

  <!--  定义操作按钮  -->
  <define-button-action>
    <a-flex
        v-if="!props.hideActionButton"
        gap="10"
        justify="flex-end"
        align="center"
    >
      <slot name="beforeButton" />
      <slot name="customActionButton">
        <template v-if="props.schemaLayout==='search'">
          <a-button @click="formExpose.resetFields">重置</a-button>
          <a-button
              type="primary"
              :loading="props.submitLoading"
              @click="onSearch"
          >
            搜索
          </a-button>
        </template>
        <template v-if="props.schemaLayout==='group' || !props.schemaLayout">
          <a-button @click="formExpose.resetFields">重置</a-button>
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </template>
        <template v-if="props.schemaLayout==='step'">
          <a-button v-if="currentStep!==0" @click="onPre">上一步</a-button>
          <a-button
              v-if="currentStep+1!==stepsItems?.length"
              type="primary"
              @click="onNext"
          >
            下一步
          </a-button>
        </template>
      </slot>
      <slot name="afterButton" />
    </a-flex>
  </define-button-action>

  <!-- 抽屉 -->
  <a-drawer
      v-if="props.container==='drawer'"
      @close="onCancel"
      v-bind="props.drawerProps"
      :open="visible"
      :mask-closable="props.maskClosable"
  >
    <template #title>
      <slot name="containerTitle">
        {{ props.containerTitle }}
      </slot>
    </template>
    <slot name="containerFormContentBefore" />
    <schema-form />
    <slot name="containerFormContentAfter" />
    <template #footer>
      <slot name="containerFooter">
        <button-action />
      </slot>
    </template>
  </a-drawer>

  <!-- 模态框 -->
  <a-modal
      v-else-if="props.container==='modal'"
      @cancel="onCancel"
      v-bind="props.modalProps"
      :open="visible"
      :mask-closable="props.maskClosable"
  >
    <template #title>
      <slot name="containerTitle">
        {{ props.containerTitle }}
      </slot>
    </template>
    <slot name="containerFormContentBefore" />
    <schema-form />
    <slot name="containerFormContentAfter" />
    <template #footer>
      <slot name="containerFooter">
        <button-action />
      </slot>
    </template>
  </a-modal>

  <!-- 卡片 -->
  <a-card
      v-else-if="props.container==='card'"
      v-bind="props.cardProps"
  >
    <template #title>
      <slot name="containerTitle">
        {{ props.containerTitle }}
      </slot>
    </template>
    <slot name="containerFormContentBefore" />
    <schema-form />
    <slot name="containerFormContentAfter" />
  </a-card>
  <schema-form v-else />
</template>

<style lang="scss" scoped>
.search {
  :deep(.ant-form-item) {
    margin-bottom: 0;
  }
}
</style>
