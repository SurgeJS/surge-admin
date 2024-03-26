<script lang="ts"
        setup>
import { BaseTableProps } from '@/components/common/BaseTable/type'
import useOmitProps from '@/hooks/common/useOmitProps'
import { computed,ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { SizeType } from 'ant-design-vue/es/config-provider'
import { densityList } from '@/components/common/BaseTable/data'
import { SuperTableColumn } from '@/components/antd/SuperTable/type'
import { cloneDeep } from 'lodash-es'

const props = withDefaults(defineProps<BaseTableProps>(),{
  showHeader: true,
  pagination: undefined,
  showExpandColumn: true,
  showSorterTooltip: true,
  indentSize: 15
})

const tableColumns = defineModel<SuperTableColumn[]>('columns')

const initialTableColumns = ref<SuperTableColumn[]>(cloneDeep(props.columns) || [])

// 超级表格Props
const superTableProps = useOmitProps(props,[ 'hideHeader','hideToolBar','heading' ])

// 当前密度
const currentDensity = ref([ 'large' ])

const size = computed(() => props.size || currentDensity.value[0])

const resetColumns = () => {
  tableColumns.value = [ ...initialTableColumns.value ]
}
</script>

<template>
  <a-card>
    <div
        v-if="!hideHeader"
        class="h-[36px] mb-3 flex-y-center justify-between">
      <h3 class="inline-flex tracking-wider h-[34px] items-center gap-1">
        <span class="inline-block w-[5px] h-[60%] bg-primary rounded" />
        {{ heading }}
      </h3>
      <div class="flex-center gap-2">
        <slot name="header-extra" />
        <a-dropdown trigger="click">
          <a-tooltip>
            <template #title>密度</template>
            <i-antd:column-height-outlined class="cursor-pointer" />
          </a-tooltip>
          <template #overlay>
            <a-menu
                v-model:selected-keys="currentDensity"
                :items="densityList"
                selectable />
          </template>
        </a-dropdown>
        <a-popover
            placement="bottomLeft"
            trigger="click">
          <template #title>
            <a-flex gap="middle" justify="space-between">
              <span>列设置</span>
              <a-button @click="resetColumns" type="link" size="small">重置</a-button>
            </a-flex>
          </template>
          <template #content>
            <vue-draggable
                handle=".drag"
                v-model="tableColumns"
                :animation="150">
              <div
                  v-for="item in tableColumns"
                  :key="item.key"
                  class="flex-y-center gap-2 py-2">
                <i-antd:holder-outlined class="drag cursor-grabbing text-xs" />
                <a-checkbox
                    :checked="!item.hide"
                    @change="()=>item.hide=!item.hide" />
                <span>{{ item.title }}</span>
              </div>
            </vue-draggable>
          </template>
          <a-tooltip>
            <template #title>列设置</template>
            <i-antd:setting-outlined class="cursor-pointer" />
          </a-tooltip>
        </a-popover>
      </div>
    </div>
    <super-table
        v-bind="superTableProps"
        :columns="tableColumns"
        :size="size as SizeType" />
  </a-card>
</template>

<style lang="scss" scoped>
</style>

