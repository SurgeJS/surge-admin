<script setup lang="ts">
import { SuperTableProps,SuperTableSlots } from '@/components/antd/SuperTable/type'
import useOmit from '@/hooks/common/useOmit'

const slots = defineSlots<SuperTableSlots>()

const props = withDefaults(defineProps<SuperTableProps>(),{
  showHeader: true,
  pagination: undefined,
  size: 'middle',
  showExpandColumn: true,
  showSorterTooltip: true,
  indentSize: 15
})
// antd table props
const aTableProps = useOmit(props,[ 'rowDrag','colDrag','colWidthDrag' ])
</script>

<template>
  <a-table v-bind="aTableProps">
    <template v-for="(slot,key) in slots" #[key]="scope">
      <slot :name="key" v-bind="scope||{}" />
    </template>
  </a-table>
</template>

<style scoped lang="scss">

</style>
