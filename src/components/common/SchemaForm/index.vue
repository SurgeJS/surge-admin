<script setup lang="ts">
import {SchemaFormEmits, SchemaFormProps, SchemaType} from '@/components/common/SchemaForm/type/props'
import useOmitProps from '@/hooks/common/useOmitProps'
import {useProvideSchemaFormContext} from '@/components/common/SchemaForm/utils/context'
import {computed} from 'vue'
import {createReusableTemplate} from "@vueuse/core";
import SchemaFormItem from "@/components/common/SchemaForm/components/SchemaFormItem.vue";

const props = withDefaults(defineProps<SchemaFormProps>(), {
  required: false,
  autoPlaceholder: true,
  // 默认一栏
  colProps: () => ({span: 24}),
  defaultDateFormat: 'YYYY-MM-DD',
  defaultTimeFormat: 'HH:mm:ss',
  defaultValueDateFormat: 'YYYY-MM-DD',
  defaultValueTimeFormat: 'HH:mm:ss'
})

const emits = defineEmits<SchemaFormEmits>()

// 创建可重用的 FormContent
const [DefineFormContent, FormContent] = createReusableTemplate<{ schema?: SchemaType[] }>();

// 提供Schema上下文
useProvideSchemaFormContext(props)

const aFormProps = useOmitProps(props, [
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

// labelCol配置
const labelCol = computed(() => {
  return props.labelWidth ? {style: {width: `${props.labelWidth}px`}, ...props.labelCol} : props.labelCol
})

</script>

<template>
  <!--  定义FormContent组件 -->
  <define-form-content v-slot="{schema}">
    <a-row>
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
    </a-row>
  </define-form-content>
  <a-form v-bind="aFormProps" :label-col="labelCol">
    <template v-if="props.schemaLayout!=='module' && props.schemaLayout!=='step'">
      <form-content :schema="props.schema" />
    </template>
    <template v-if="props.schemaLayout==='module'">
      <template v-for="(config,i) in props.moduleSchema" :key="i">
        <form-content :schema="config.form" />
      </template>
    </template>
    <template v-if="props.schemaLayout==='step'">
      <template v-for="(config,i) in props.stepSchema" :key="i">
        <form-content :schema="config.form" />
      </template>
    </template>
  </a-form>
</template>

<style scoped lang="scss">
</style>
