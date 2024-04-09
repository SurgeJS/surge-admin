<script setup lang="ts">
import { SchemaFormProps,SchemaPropertiesConfig } from '@/components/common/SchemaForm/type/props'
import { InputProps,SelectProps } from 'ant-design-vue'
import { computed } from 'vue'

const props = defineProps<SchemaFormProps>()

const component = computed(() => (propertiesConfig: SchemaPropertiesConfig) => {
  return typeof propertiesConfig.renderComponent === 'string' ?
    {
      name: propertiesConfig.renderComponent
    } :
    {
      name: propertiesConfig.renderComponent?.name,
      props: propertiesConfig.renderComponent?.props
    }
})
</script>

<template>
  <a-form>
    <a-form-item
      v-for="(propertiesConfig,key) in props.schema"
      :key="key"
      :name="key"
      :label="props.schema[key]?.label"
    >
      <!-- 输入框 -->
      <a-input
        v-if="component(propertiesConfig).name === 'input'"
        v-bind="component(propertiesConfig).props as InputProps"
        v-model:value="model[key]"
      />

      <!-- 选择器 -->
      <a-select
        v-if="component(propertiesConfig).name === 'select'"
        v-bind="component(propertiesConfig).props as SelectProps"
        v-model:value="model[key]"
      />
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">

</style>
