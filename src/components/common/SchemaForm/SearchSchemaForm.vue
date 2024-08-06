<script setup lang="ts">
import {
  SearchSchemaFormExpose,
  SearchSchemaFormProps,
  SearchSchemaFormSlots
} from '@/components/common/SchemaForm/types/type'
import initialProps from '@/components/common/SchemaForm/utils/initialProps'
import useOmitProps from '@/hooks/common/useOmitProps'
import useCommonExpose from '@/components/common/SchemaForm/hooks/useCommonExpose'
import { take } from 'lodash-es'

const props = withDefaults(defineProps<SearchSchemaFormProps>(), {
  ...initialProps,
  searchShowNumber: 3
})

defineSlots<SearchSchemaFormSlots>()
// const ref1 = useOmitSlots(slots,['customActionButton'])
// ref1.value.
// 表单模型
const model = defineModel<Recordable>('model', { required: true })

const formProps = useOmitProps(props,['searchShowNumber'])

// 通用方法
const { formRef,commonExpose } = useCommonExpose()

// 是否展开搜索表单
const [isExpandSearchForm, setExpandSearchForm] = useToggle()

// const formContentSlots = ref<string[]>([])

// 搜索Schema
const searchSchemas = computed(() => {
  if (!props.searchShowNumber) return props.schema
  if (isExpandSearchForm.value) return props.schema
  return take(props.schema, props.searchShowNumber)
})

// 展开收起文案
const searchExpandCollapse = computed(() => ({
  text: isExpandSearchForm.value ? '收起' : '展开',
  icon: isExpandSearchForm.value ? 'i-ic:outline-keyboard-arrow-up' : 'i-ic:outline-keyboard-arrow-down'
}))

const handleReset = () => {
  props.onReset ? props.onReset(commonExpose.resetFields,model.value) : commonExpose.resetFields()
}

onMounted(() => {

})

defineExpose<SearchSchemaFormExpose>(commonExpose)
</script>

<template>
  <schema-form-wrap
    ref="formRef"
    v-bind="formProps"
    :model="model"
  >
    <schema-form-content :schema="searchSchemas">
      <a-col v-if="!props.hideActionButton" class="flex-auto flex-inline justify-end items-center gap-[10px]">
        <a-flex
          v-if="!props.hideActionButton"
          gap="10"
          justify="flex-end"
          align="center"
        >
          <slot name="beforeButton" />
          <slot name="customActionButton">
            <a-button @click="handleReset">重置</a-button>
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
          </slot>
          <slot name="afterButton" />
        </a-flex>
      </a-col>
    </schema-form-content>
  </schema-form-wrap>
</template>

<style scoped lang="scss">

</style>