<script setup lang="ts">
import { SuperTableEmits,SuperTableProps,SuperTableSlots } from '@/components/antd/SuperTable/type'
import { Table } from 'ant-design-vue'
import { ref } from 'vue'
import useOmit from '@/hooks/common/useOmit'

const slots = defineSlots<SuperTableSlots>()
const emits = defineEmits<SuperTableEmits>()

const props = withDefaults(defineProps<SuperTableProps>(),{
  showHeader: true,
  pagination: undefined,
  showExpandColumn: true,
  showSorterTooltip: true,
  indentSize: 15
})

// antd table props
const aTableProps = useOmit(props,[ ])

const tableRef = ref<InstanceType<typeof Table> | null>(null)
</script>

<template>
  <a-table ref="tableRef" v-bind="aTableProps">
    <template v-for="(slot,key) in slots" #[key]="scope">
      <slot :name="key" v-bind="scope||{}" />
    </template>
  </a-table>
</template>

<style scoped lang="scss">

</style>
