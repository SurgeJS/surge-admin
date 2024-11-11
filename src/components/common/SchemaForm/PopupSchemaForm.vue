<script setup lang="ts">
import {
  PopupSchemaFormExpose,
  PopupSchemaFormProps,
  PopupSchemaFormSlots
} from '@/components/common/SchemaForm/types/popup.ts'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'
import { UnwrapRefSchema } from '@/components/common/SchemaForm/types/common.ts'

const drawerDefaultWidth = '500px'

const modalDefaultWidth = '800px'

const modalDefaultHeight = '70vh'

const props = withDefaults(defineProps<PopupSchemaFormProps>(), {
  autoPlaceholder: true,
  autoRules: true,
  autoLabelWidth: true,
  autoScrollToFailField: true,
  hideActionButton: false,
  showLabel: true,
  showFeedback: true,
  showRequireMark: undefined,
  labelOverflowOmitted: false,
  labelPlacement: 'top',
  submitText: '提交',
  resetText: '重置',
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  gridProps: () => ({
    cols: 24,
    yGap: 12
  }),
  gridItemProps: 24,
  popupType: 'drawer',
  maskClosable: true,
  closeResetModel: true,
  closeConfirm: true,
  confirmTitle: '关闭提示',
  confirmContent: '您确定要关闭它吗？',
  drawerContentProps: () => ({ closable: true }),
  colProps: 24
})
const slots = defineSlots<PopupSchemaFormSlots>()

// 表单模型
const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<UnwrapRefSchema[]>('schema', { required: true })
const visible = defineModel<boolean>('visible', { required: true })

const [ DefineActionButton, ActionButton ] = createReusableTemplate()
const [ DefineForm, Form ] = createReusableTemplate()

// 提供Schema上下文
useProvideSchemaFormContext(props, model)
const formProps = useOmitProps(props, [
  'schema',
  'visible',
  'popupType',
  'title',
  'width',
  'height',
  'drawerProps',
  'drawerContentProps',
  'modalProps',
  'modalCardProps',
  'maskClosable',
  'closeResetModel',
  'closeConfirm',
  'confirmTitle',
  'confirmContent'
])
const formContentSlots = useOmitProps(slots, [ 'customActionButton', 'buttonAfter', 'buttonBefore', 'popupHeader', 'popupFormBefore', 'popupFormAfter', 'popupFooter' ])
// 通用方法
const { formRef, commonExpose } = useExpose()
const { handleReset, handleSubmit } = useMethod(props, commonExpose, model)
const dialog = useDialog()
// 关闭弹框并重置表单
const closeAndReset = () => {
  props.closeResetModel && commonExpose.resetFields()
  visible.value = false
}

const showConfirmModal = () => {
  dialog.warning({
    title: props.confirmTitle,
    content: props.confirmContent,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      closeAndReset()
    },
    onNegativeClick: () => {
    }
  })
}

const onUpdateShow = (isShow: boolean) => {
  if (isShow) return
  if (props.closeConfirm) return showConfirmModal()
  closeAndReset()
}

defineExpose<PopupSchemaFormExpose>(commonExpose)
</script>

<template>
  <!-- 操作按钮 -->
  <define-action-button>
    <n-flex
      v-if="!props.hideActionButton"
      justify="flex-end"
      align="center"
      gap="12"
    >
      <slot name="buttonBefore" />
      <slot name="customActionButton">
        <n-button
          v-if="!hideReset"
          :loading="props.resetLoading"
          @click="handleReset"
        >
          {{ props.resetText }}
        </n-button>
        <n-button
          type="primary"
          :loading="props.submitLoading"
          @click="handleSubmit"
        >
          {{ props.submitText }}
        </n-button>
      </slot>
      <slot name="buttonAfter" />
    </n-flex>
  </define-action-button>
  <!-- 表单 -->
  <define-form>
    <schema-form-wrap
      ref="formRef"
      v-bind="formProps"
      :model="model"
    >
      <schema-form-content :schema="schema" :grid-props="gridProps">
        <template v-for="(slot,key) in formContentSlots" #[key]="scope">
          <slot :name="key" v-bind="scope||{}" />
        </template>
      </schema-form-content>
    </schema-form-wrap>
  </define-form>

  <!-- 抽屉 -->
  <n-drawer
    v-if="props.popupType==='drawer'"
    :width="props.width || drawerDefaultWidth"
    :height="props.height"
    v-bind="props.drawerProps"
    :show="visible"
    :mask-closable="props.maskClosable"
    @update:show="onUpdateShow"
  >
    <n-drawer-content v-bind="props.drawerContentProps">
      <template #header>
        <slot name="popupHeader">
          {{ props.title || props.drawerContentProps?.title }}
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
    </n-drawer-content>
  </n-drawer>

  <!-- 模态框 -->
  <n-modal
    v-else-if="props.popupType==='modal'"
    v-bind="props.modalProps"
    :show="visible"
    :mask-closable="props.maskClosable"
    @update:show="onUpdateShow"
  >
    <n-card
      :style="{width:props.width || modalDefaultWidth,height:props.height || modalDefaultHeight}"
      content-class="overflow-auto"
      v-bind="props.modalCardProps"
    >
      <template #header>
        <slot name="popupHeader">
          {{ props.title || props.modalCardProps?.title }}
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
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
</style>