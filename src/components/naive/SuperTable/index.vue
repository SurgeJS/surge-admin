<script setup lang="ts">
import { SuperTableProps, SuperTableSlots } from '@/components/naive/SuperTable/type/props'
import { Table } from 'ant-design-vue'
import { computed, ref } from 'vue'
import useOmitProps from '@/hooks/common/useOmitProps'

const slots = defineSlots<SuperTableSlots>()
// const emits = defineEmits<SuperTableEmits>()

const props = withDefaults(defineProps<SuperTableProps>(),{
  showHeader: true,
  pagination: undefined,
  showExpandColumn: true,
  showSorterTooltip: true,
  indentSize: 15
})

// antd table props
const aTableProps = useOmitProps(props,[])

const tableRef = ref<InstanceType<typeof Table> | null>(null)

const tableColumns = computed(() => props.columns?.filter(item => !item.hide))
</script>

<template>
  <a-table
    ref="tableRef"
    v-bind="aTableProps"
    :columns="tableColumns"
  >
    <template v-for="(slot,key) in slots" #[key]="scope">
      <slot :name="key" v-bind="scope||{}" />
    </template>
  </a-table>
</template>

<style scoped lang="scss">

</style>
