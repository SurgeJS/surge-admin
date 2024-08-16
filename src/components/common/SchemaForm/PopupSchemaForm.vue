<script setup lang="ts">
import {
  PopupSchemaFormExpose,
  PopupSchemaFormProps,
  PopupSchemaFormSlots
} from '@/components/common/SchemaForm/types/type'
import initialProps from '@/components/common/SchemaForm/utils/initialProps'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'
import { Modal } from 'ant-design-vue'

const props = withDefaults(defineProps<PopupSchemaFormProps>(), {
  ...initialProps,
  layout: 'vertical',
  popupType: 'drawer',
  maskClosable:false,
  closeResetModel: true,
  closeConfirm: true,
  confirmTitle: '关闭提示',
  confirmContent: '您确定要关闭它吗？',
  drawerProps: () => ({ width: 500 }),
  modalProps: () => ({ width: 800 }),
  colProps: 24
})
const slots = defineSlots<PopupSchemaFormSlots>()

// 表单模型
const model = defineModel<Recordable>('model', { required: true })
const visible = defineModel<boolean>('visible', { required: true })
const [ DefineActionButton, ActionButton ] = createReusableTemplate()
const [ DefineForm, Form ] = createReusableTemplate()
// 提供Schema上下文
useProvideSchemaFormContext(props, model)
const formProps = useOmitProps(props, [ 'schema', 'visible', 'popupType', 'popupTitle', 'drawerProps', 'modalProps', 'maskClosable', 'closeResetModel', 'closeConfirm', 'confirmTitle', 'confirmContent' ])
const formContentSlots = useOmitProps(slots, [ 'customActionButton', 'buttonAfter', 'buttonBefore', 'popupHeader', 'popupFormBefore', 'popupFormAfter', 'popupFooter' ])

// 通用方法
const { formRef, commonExpose } = useExpose()
const { handleReset, handleSubmit } = useMethod(props, commonExpose, model)

// 关闭弹框并重置表单
const closeAndReset = () => {
  props.closeResetModel && commonExpose.resetFields()
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

defineExpose<PopupSchemaFormExpose>(commonExpose)
</script>

<template>
  <!-- 操作按钮 -->
  <define-action-button>
    <a-flex
      v-if="!props.hideActionButton"
      justify="flex-end"
      align="center"
      gap="12"
    >
      <slot name="buttonBefore" />
      <slot name="customActionButton">
        <a-button
          v-if="!hideReset"
          :loading="props.resetLoading"
          @click="handleReset"
        >
          {{ props.resetText }}
        </a-button>
        <a-button
          type="primary"
          :loading="props.submitLoading"
          @click="handleSubmit"
        >
          {{ props.submitText }}
        </a-button>
      </slot>
      <slot name="buttonAfter" />
    </a-flex>
  </define-action-button>
  <!-- 表单 -->
  <define-form>
    <schema-form-wrap
      ref="formRef"
      v-bind="formProps"
      :model="model"
    >
      <schema-form-content :schema="schema">
        <template v-for="(slot,key) in formContentSlots" #[key]="scope">
          <slot :name="key" v-bind="scope||{}" />
        </template>
      </schema-form-content>
    </schema-form-wrap>
  </define-form>
  <!-- 抽屉 -->
  <a-drawer
    v-if="props.popupType==='drawer'"
    v-bind="props.drawerProps"
    :open="visible"
    :mask-closable="props.maskClosable"
    @close="onCancel"
  >
    <template #title>
      <slot name="popupHeader">
        {{ props.popupTitle }}
      </slot>
    </template>
    <slot name="popupFormBefore" />
    <Form />
    <slot name="popupFormAfter" />
    <template #footer>
      <slot name="popupFooter">
        <action-button />
      </slot>
    </template>
  </a-drawer>

  <!-- 模态框 -->
  <a-modal
    v-else-if="props.popupType==='modal'"
    v-bind="props.modalProps"
    :open="visible"
    :mask-closable="props.maskClosable"
    @cancel="onCancel"
  >
    <template #title>
      <slot name="popupHeader">
        {{ props.popupTitle }}
      </slot>
    </template>
    <slot name="popupFormBefore" />
    <Form />
    <slot name="popupFormAfter" />
    <template #footer>
      <slot name="popupFooter">
        <action-button />
      </slot>
    </template>
  </a-modal>
</template>

<style scoped lang="scss">

</style>