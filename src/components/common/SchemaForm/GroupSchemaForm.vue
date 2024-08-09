<script setup lang="ts">
import {
  GroupSchemaFormExpose,
  GroupSchemaFormProps,
  GroupSchemaFormSlots,
  GroupSchemaType
} from '@/components/common/SchemaForm/types/type'
import initialProps from '@/components/common/SchemaForm/utils/initialProps'
import useOmitProps from '@/hooks/common/useOmitProps'
import useExpose from '@/components/common/SchemaForm/hooks/useExpose'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import useMethod from '@/components/common/SchemaForm/hooks/useMethod'
import { unref } from 'vue'
import { isBoolean, isFunction } from 'lodash-es'

const props = withDefaults(defineProps<GroupSchemaFormProps>(), {
  ...initialProps,
  colProps:24
})
const slots = defineSlots<GroupSchemaFormSlots>()

// 表单模型
const model = defineModel<Recordable>('model', { required: true })
// 提供Schema上下文
useProvideSchemaFormContext(props, model)
const formProps = useOmitProps(props, ['schema'])
const formContentSlots = useOmitProps(slots, ['customActionButton', 'buttonAfter', 'buttonBefore','groupTitle'])
// 通用的导出方法
const { formRef, commonExpose } = useExpose()
// 通用方法
const { handleReset, handleSubmit } = useMethod(props, commonExpose, model)

const groupSchema = computed(() => {
  return props.schema?.map(item => {
    const value = { ...item }
    if (!isRef(item.isFold)) value.isFold = toRef(Boolean(item.isFold))
    value.form.forEach(formItem => {
      if (formItem.disabled === undefined && value.disabled !== undefined) {
        formItem.disabled = value.disabled
      }
    })
    return value
  })
})

const handleGroupHide = (config: GroupSchemaType) => {
  let isHide = true
  const hide = unref(config.hide)
  if (isBoolean(hide)) isHide = !hide
  if (isFunction(hide)) isHide = !hide({ group: config, model: model.value })
  return isHide
}

// 展开收起文案
const getGroupExpandCollapseText = (config: GroupSchemaType) => {
  return {
    text: unref(config.isFold) ? '展开' : '收起',
    icon: unref(config.isFold) ? 'i-ic:outline-keyboard-arrow-down' : 'i-ic:outline-keyboard-arrow-up'
  }
}

const setFold = (config: GroupSchemaType) => {
  if (isRef(config.isFold)) {
    config.isFold.value = !config.isFold.value
  } else {
    config.isFold = !config.isFold
  }
}

defineExpose<GroupSchemaFormExpose>(commonExpose)
</script>

<template>
  <schema-form-wrap
    ref="formRef"
    v-bind="formProps"
    :model="model"
  >
    <template v-for="(config,i) in groupSchema" :key="i">
      <template v-if="handleGroupHide">
        <div class="schemaForm-groupHeader">
          <div class="schemaForm-groupHeader-title">
            <slot name="groupTitle" :group-schema="config">
              <span class="schemaForm-groupHeader-title-placeholder" />
              <span class="schemaForm-groupHeader-title-name">{{ unref(config.title) }}</span>
            </slot>
            <a-tooltip v-if="unref(config.helpMessage)">
              <template #title>{{ unref(config.helpMessage) }}</template>
              <icon
                icon="i-ant-design:question-circle-outlined"
                class="text-tertiary"
                size="14ox"
              />
            </a-tooltip>
          </div>
          <a-button
            v-if="!config.isHideExpandCollapseButton"
            :disabled="false"
            type="link"
            @click="setFold(config)"
          >
            <template #icon>
              <icon :icon="getGroupExpandCollapseText(config).icon" />
            </template>
            {{ getGroupExpandCollapseText(config).text }}
          </a-button>
        </div>
        <schema-form-content v-show="!unref(config.isFold)" :schema="config.form">
          <template
            v-for="(value,key) in formContentSlots"
            :key="key"
            #[key]
          >
            <slot :name="key" />
          </template>
        </schema-form-content>
      </template>
    </template>
    <a-flex
      v-if="!props.hideActionButton"
      justify="flex-end"
      align="center"
      class="px-6px"
      :gap="12"
    >
      <slot name="buttonBefore" />
      <slot name="customActionButton">
        <a-button :loading="props.resetLoading" @click="handleReset">{{ props.resetText }}</a-button>
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
  </schema-form-wrap>
</template>

<style scoped lang="scss">
.schemaForm-groupHeader {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 8px  0 8px 8px;
  background: theme('colors.primary-shallow');
  border-radius: 6px;
  &-title {
    display: inline-flex;
    align-items: center;
    line-height: 20px;
    gap: 5px;

    &-placeholder {
      display: inline-block;
      height: 20px;
      width: 3px;
      background: theme('colors.primary');
      border-radius: 6px;
    }

    &-name {
      font-size: 15px;
      font-weight: 600;
      position: relative;
    }
  }
}
</style>