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
import { computed, ref, unref } from 'vue'
import { createReusableTemplate, useToggle } from '@vueuse/core'
import { FormInstance } from 'ant-design-vue/es/form'
import { isBoolean, isFunction, isNumber, omit, set, take } from 'lodash-es'
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem.vue'
import { Modal } from 'ant-design-vue'
import { Gutter } from 'ant-design-vue/es/grid/Row'

const props = withDefaults(defineProps<SchemaFormProps>(), {
  required: false,
  autoPlaceholder: true,
  autoLabelWidth: true,
  autoRules: true,
  hideActionButton: false,
  maskClosable: false,
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

defineSlots<SchemaFormSlots>()

const emits = defineEmits<SchemaFormEmits>()
// 当前步骤条激活项
const activeStep = defineModel<number>('activeStep', { default: 1 })
// 弹框、抽屉可见
const visible = defineModel<boolean>('visible', { default: false })
// 表单模型
const model = defineModel<Recordable>('model', { required: true })

// 创建表单可复用模板
const [ DefineSchemaForm, SchemaForm ] = createReusableTemplate()
// 创建表单内容可复用模板
const [ DefineFormContent, FormContent ] = createReusableTemplate<{ schema?: SchemaType[] }>()
// 创建按钮操作可复用模板
const [ DefineButtonAction, ButtonAction ] = createReusableTemplate<{ schemaLayout?: SchemaLayout }>()

// 提供Schema上下文
const { aFormProps, getModelValue } = useProvideSchemaFormContext(props, model)

// 是否展开搜索表单
const [ isExpandSearchForm, setExpandSearchForm ] = useToggle()

// 表单实例
const formRef = ref<FormInstance>()

// 间距
const rowGutter = computed<Gutter>(() => (props.schemaLayout === 'search' ? [ 12, 12 ] : 12) as Gutter)

// 搜索Schema
const searchSchemas = computed(() => {
  if (!props.searchShowNumber) return props.schema
  if (isExpandSearchForm.value) return props.schema
  return take(props.schema, props.searchShowNumber)
})

const formClassObj = computed(() => {
  const cls = {
    form: true,
    search: props.schemaLayout === 'search'
  }
  if (props.formClass) cls[props.formClass] = true

  return cls
})

// labelCol配置
const labelCol = computed(() => {
  if (!props.labelWidth) return props.labelCol
  return {
    style: {
      width: isNumber(props.labelWidth)
          ? `${ props.labelWidth }px`
          : props.labelWidth
    }, ...props.labelCol
  }
})

// 步骤条选项
const stepsItems = computed(() => props.stepSchema?.map(item => omit(item, [ 'form' ])))

const expandCollapse = computed(() => ({
  text: isExpandSearchForm.value ? '收起' : '展开',
  icon: isExpandSearchForm.value ? 'i-ic:outline-keyboard-arrow-up' : 'i-ic:outline-keyboard-arrow-down'
}))

// 查询事件
const onSearch = () => {
  emits('search', formRef.value!.validate, model.value)
}

// 提交事件
const onSubmit = () => {
  formExpose.validate()
      .then(() => emits('submitSuccess', model.value))
      .catch((err) => emits('submitError', err))
}

const handleGroupHide = (config: GroupSchemaType) => {
  let isHide = true
  const hide = unref(config.hide)
  if (isBoolean(hide)) isHide = !hide
  if (isFunction(hide)) isHide = !hide({ group: config, model: model.value })
  return isHide
}

// 获取当前步骤的Model
const getCurrentStepModel = () => {
  if (!props.stepSchema) return {}

  return props.stepSchema[activeStep.value]?.form.reduce<Recordable>((currentModel, item) => {
    if (!item.field) return currentModel
    const field = item.field as string
    set(currentModel, field, getModelValue(field))
    return currentModel
  }, {})
}

// 上一步
const onPre = () => {
  emits('pre', activeStep.value - 1)
}

// 下一步
const onNext = () => {
  const currentModel = getCurrentStepModel()
  formExpose.validate()
      .then(() => {
        emits('nextSuccess', activeStep.value + 1, currentModel, props.model)
      })
      .catch((err) => emits('nextError', err))
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

const showConfirmModal = () => {
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
}

const onCancel = (e) => {
  if (props.closeConfirm) return showConfirmModal()
  // 点击的遮罩层
  if (e.target.tagName === 'DIV') {
    props.maskClosable && closeAndReset()
  } else {
    closeAndReset()
  }
}
defineExpose<SchemaFormExpose>(formExpose)
</script>

<template>
  <!--  定义FormContent组件 -->
  <define-form-content v-slot="{schema}">
    <a-row class="w-full" :gutter="rowGutter">
      <template
        v-for="config in schema "
        :key="config.field||config.slot"
      >
        <schema-form-item
          v-if="config.component||config.contentSlot||config.slot"
          ref="formItemsRef"
          :schema="config as any"
        >
          <slot v-if="config.contentSlot" :name="config.contentSlot" />
          <template v-if="config.slot" #[config.slot]>
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
      :current="activeStep-1"
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
                <span class="font-bold">{{ unref(config.title) }}</span>
                <a-tooltip v-if="unref(config.helpMessage)">
                  <template #title>{{ unref(config.helpMessage) }}}</template>
                  <icon
                    icon="i-ant-design:question-circle-outlined"
                    class="text-tertiary"
                    size="14ox"
                  />
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
          <form-content v-show="i+1 === activeStep" :schema="config.form" />
        </template>
        <button-action v-if="props.container=='card'" />
      </template>
      <!-- 搜索 -->
      <template v-else-if="props.schemaLayout==='search'">
        <form-content :schema="searchSchemas" />
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
      :class="{'px-[6px]':schemaLayout!=='search'}"
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
          <a-button
            v-if="props.searchShowNumber"
            type="link"
            @click="setExpandSearchForm()"
          >
            {{ expandCollapse.text }}
            <icon :icon="expandCollapse.icon" />
          </a-button>
        </template>
        <template v-if="props.schemaLayout==='group' || !props.schemaLayout">
          <a-button @click="formExpose.resetFields">重置</a-button>
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </template>
        <template v-if="props.schemaLayout==='step'">
          <a-button v-if="activeStep!==1" @click="onPre">上一步</a-button>
          <a-button
            v-if="activeStep!==stepsItems?.length"
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
    v-bind="props.drawerProps"
    :open="visible"
    :mask-closable="props.maskClosable"
    @close="onCancel"
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
    v-bind="props.modalProps"
    :open="visible"
    :mask-closable="props.maskClosable"
    @cancel="onCancel"
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

:deep(.ant-row) {
  margin: 0 !important;
}
</style>
