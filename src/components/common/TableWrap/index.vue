<script lang="ts" setup>
import { TableWrapProps, TableWrapSlots } from '@/components/common/TableWrap/types/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import { computed } from 'vue'
import { SuperTableColumn } from '@/components/naive/SuperTable/type/props'
import { useProvideBaseTableStore } from '@/components/common/TableWrap/hooks/useContext'
import { SizeType } from 'ant-design-vue/es/config-provider'

const props = withDefaults(defineProps<TableWrapProps>(), {
  showHeader: true,
  pagination: undefined,
  showExpandColumn: true,
  showSorterTooltip: true,
  indentSize: 15
})
defineSlots<TableWrapSlots>()

const tableColumns = defineModel<SuperTableColumn[]>('columns', { required: true })

const { currentDensity } = useProvideBaseTableStore(props, tableColumns)

// 超级表格Props
const superTableProps = useOmitProps(props, [ 'heading', 'hideHeader', 'hideToolBar' ])

const size = computed(() => props.size || currentDensity.value[0] as SizeType)

// const columns = ref<SuperTableColumn[]>([])
</script>


<template>
  <a-card>
    <base-table-tool-bar>
      <template #header-extra>
        <slot name="headerExtra" />
      </template>
      <template #heading>
        <slot name="heading">{{ props.heading }}</slot>
      </template>
    </base-table-tool-bar>
    <super-table
      v-bind="superTableProps"
      :columns="tableColumns"
      :size="size"
    />
  </a-card>
</template>

<style lang="scss" scoped>
:deep(.ant-card-body) {
  overflow-x: hidden;
}
</style>

