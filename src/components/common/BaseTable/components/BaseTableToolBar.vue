<script setup lang="ts">
import { densityList } from '@/components/common/BaseTable/utils/data'
import { useBaseTableStore } from '@/components/common/BaseTable/utils/useBaseTableContext'
import { cloneDeep } from 'lodash-es'
import { unref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const { props,currentDensity,tableColumns } = useBaseTableStore()!

const initialTableColumns = cloneDeep(unref(tableColumns.value))

const resetColumns = () => {
  tableColumns.value = cloneDeep(initialTableColumns)
}
</script>


<template>
  <div
      v-if="!props.hideHeader"
      class="h-[36px] mb-3 flex-y-center justify-between">
    <h3 class="inline-flex tracking-wider h-[34px] items-center gap-1 text-[16px]">
      <span class="inline-block w-[5px] h-[60%] bg-primary rounded" />
      <slot name="heading">
        {{ props.heading }}
      </slot>
    </h3>
    <div class="flex-center gap-2">
      <slot name="header-extra" />
      <a-dropdown trigger="click">
        <a-tooltip>
          <template #title>密度</template>
          <i-antd:column-height-outlined class="cursor-pointer text-[16px]" />
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
            <a-button size="small" type="link" @click="resetColumns">重置</a-button>
          </a-flex>
        </template>
        <template #content>
          <vue-draggable
              v-model="tableColumns"
              :animation="300"
              class="flex flex-col gap-2"
              handle=".drag">
            <template v-for="item in tableColumns" :key="item.key">
              <div v-if="!item.fixed" class="flex-y-center gap-2 ">
                <i-antd:holder-outlined class="drag cursor-grabbing text-xs" />
                <a-checkbox
                    :checked="!item.hide"
                    @change="()=>item.hide=!item.hide" />
                <span>{{ item.title }}</span>
              </div>
            </template>
          </vue-draggable>
        </template>
        <a-tooltip>
          <template #title>列设置</template>
          <i-antd:setting-outlined class="cursor-pointer text-[16px]" />
        </a-tooltip>
      </a-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
