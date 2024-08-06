<script setup lang="ts">
import {
  SchemaFormContentProps,
  SchemaFormEmits,
  SchemaFormExpose,
  SchemaFormProps,
  SchemaFormSlots,
  SchemaLayout
} from '@/components/common/SchemaForm/types/type'
import { useProvideSchemaFormContext } from '@/components/common/SchemaForm/hooks/useContext'
import { unref } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import SchemaFormItem from '@/components/common/SchemaForm/components/SchemaFormItem/index.vue'
import useSchemaFormExpose from '@/components/common/SchemaForm/hooks/useSchemaFormExpose'
import useSchemaFormSearch from '@/components/common/SchemaForm/hooks/useSchemaFormSearch'
import useSchemaFormCommon from '@/components/common/SchemaForm/hooks/useSchemaFormCommon'
import useSchemaFormSteps from '@/components/common/SchemaForm/hooks/useSchemaFormSteps'
import useSchemaFormGroup from '@/components/common/SchemaForm/hooks/useSchemaFormGroup'
import useSchemaFormPopup from '@/components/common/SchemaForm/hooks/useSchemaFormPopup'

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
const [DefineSchemaForm, SchemaForm] = createReusableTemplate()
// 创建表单内容可复用模板
const [DefineFormContent, FormContent] = createReusableTemplate<SchemaFormContentProps>()
// 创建按钮操作可复用模板
const [DefineButtonAction, ButtonAction] = createReusableTemplate<{ schemaLayout?: SchemaLayout }>()

// 提供Schema上下文
const { aFormProps } = useProvideSchemaFormContext(props, model)
// form方法
const { formRef,formExpose } = useSchemaFormExpose(emits)
// 通用hook
const { rowGutter,formClassObj,labelCol,onSubmit } = useSchemaFormCommon(props,emits,formExpose,model)
// 搜索hook
const { searchSchemas,searchExpandCollapse,setExpandSearchForm,onSearch } = useSchemaFormSearch(props,emits,formExpose,model)
// 步骤hook
const { stepsItems,onNext,onPre } = useSchemaFormSteps(props,emits,formExpose,activeStep)
// 组hook
const { handleGroupHide,getGroupExpandCollapseText,setFold,groupSchema } = useSchemaFormGroup(props,model)
// 弹框hook
const { onCancel } = useSchemaFormPopup(props,emits,formExpose,visible)

defineExpose<SchemaFormExpose>(formExpose)
</script>

<template>
  <!--  定义FormContent组件 -->
  <define-form-content v-slot="{$slots,schema}">
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
      <component :is="$slots.default" v-if="$slots.default" />
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
        <template v-for="(config,i) in groupSchema" :key="i">
          <template v-if="handleGroupHide(config)">
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
            <form-content v-show="!unref(config.isFold)" :schema="config.form" />
          </template>
        </template>
        <button-action />
      </template>
      <!-- 步骤 -->
      <template v-else-if="props.schemaLayout==='step'">
        <template v-for="(config,i) in props.stepSchema" :key="i">
          <form-content v-show="i+1 === activeStep" :schema="config.form" />
        </template>
        <button-action />
      </template>
      <!-- 搜索 -->
      <template v-else-if="props.schemaLayout==='search'">
        <form-content :schema="searchSchemas">
          <a-col class="flex-auto">
            <button-action />
          </a-col>
        </form-content>
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
          <a-button @click="formExpose.resetFields()">重置</a-button>
          <a-button
            type="primary"
            :loading="props.submitLoading"
            @click="onSearch()"
          >
            搜索
          </a-button>
          <a-button
            v-if="props.searchShowNumber"
            type="link"
            @click="setExpandSearchForm()"
          >
            {{ searchExpandCollapse.text }}
            <icon :icon="searchExpandCollapse.icon" />
          </a-button>
        </template>
        <template v-if="props.schemaLayout==='group' || !props.schemaLayout">
          <a-button @click="formExpose.resetFields()">重置</a-button>
          <a-button type="primary" @click="onSubmit()">提交</a-button>
        </template>
        <template v-if="props.schemaLayout==='step'">
          <a-button v-if="activeStep!==1" @click="onPre()">上一步</a-button>
          <a-button
            v-if="activeStep!==stepsItems?.length"
            type="primary"
            @click="onNext()"
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
