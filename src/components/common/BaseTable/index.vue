<script lang="ts" setup>
import { BaseTableProps } from '@/components/common/BaseTable/type'
import useOmit from '@/hooks/common/useOmit'
import { ItemType } from 'ant-design-vue'
import { computed,ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { VueDraggable } from 'vue-draggable-plus'

const props = withDefaults(defineProps<BaseTableProps>(),{
  showHeader: true,
  pagination: undefined,
  showExpandColumn: true,
  showSorterTooltip: true,
  indentSize: 15
})

const superTableProps = useOmit(props,[ 'hideHeader','hideToolBar','heading' ])

// 密度列表
const densityList: ItemType[] = [
  {
    label: '默认',
    key: 'large'
  },
  {
    label: '中等',
    key: 'middle'
  },
  {
    label: '紧凑',
    key: 'small'
  }
]

// 当前密度
const currentDensity = ref([ 'large' ])

const tableColumns = computed(() => cloneDeep(props.columns) || [])
const col = computed(() => tableColumns.value.map(item => ({ key: item.dataIndex as string,title: item.title })))
console.log(col)
</script>

<template>
  <a-card>
    <div v-if="!hideHeader" class="h-[36px] mb-3 flex-y-center justify-between">
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
            <a-menu selectable v-model:selected-keys="currentDensity" :items="densityList" />
          </template>
        </a-dropdown>
        <a-popover title="列设置" trigger="click" placement="bottomLeft">
          <template #content>
            <vue-draggable animation="150" ref="el" v-model="col">
              <div class="flex-y-center gap-2" v-for="item in col" :key="item.key">
                <i-antd:holder-outlined class="cursor-pointer text-xs" />
                <a-checkbox />
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
    <super-table v-bind="superTableProps" :size="props.size||currentDensity[0]" :columns="tableColumns" />
  </a-card>
</template>

<style lang="scss" scoped>
</style>

