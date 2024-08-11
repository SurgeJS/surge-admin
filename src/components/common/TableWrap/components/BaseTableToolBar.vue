<script setup lang="ts">
import { densityList } from '@/components/common/TableWrap/utils/data'
import { useBaseTableStore } from '@/components/common/TableWrap/hooks/useContext'
import { cloneDeep } from 'lodash-es'
import { unref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const { props, currentDensity, tableColumns } = useBaseTableStore()!

const initialTableColumns = cloneDeep(unref(tableColumns.value))

const resetColumns = () => {
  tableColumns.value = cloneDeep(initialTableColumns)
}
</script>

<template>
  <div
    v-if="!props.hideHeader"
    class="h-[36px] mb-3 flex-y-center justify-between "
  >
    <h3 class="inline-flex tracking-wider h-[34px] items-center gap-1 ">
      <span class="inline-block w-[5px] h-[60%] bg-primary rounded" />
      <slot name="heading">
        {{ props.heading }}
      </slot>
    </h3>
    <div class="flex-center gap-2">
      <slot name="header-extra" />
      <a-dropdown trigger="click">
        <a-tooltip :mouse-enter-delay=".5">
          <template #title>密度</template>
          <icon
            icon="i-ant-design:column-height-outlined"
            pointer
            class="text-base"
          />
        </a-tooltip>
        <template #overlay>
          <a-menu
            v-model:selected-keys="currentDensity"
            :items="densityList"
            selectable
          />
        </template>
      </a-dropdown>
      <a-popover
        placement="bottomLeft"
        trigger="click"
      >
        <template #title>
          <a-flex gap="middle" justify="space-between">
            <span>列设置</span>
            <a-button
              size="small"
              type="link"
              @click="resetColumns"
            >
              重置
            </a-button>
          </a-flex>
        </template>
        <template #content>
          <vue-draggable
            v-model="tableColumns"
            :animation="300"
            class="flex flex-col gap-[10px]"
            handle=".drag"
          >
            <template v-for="item in tableColumns" :key="item.key">
              <div
                v-if="!item.fixed"
                class="flex-y-center gap-2 rounded hover:bg-fill-secondary "
              >
                <icon icon="i-ant-design:holder-outlined" class="drag cursor-grabbing text-xs" />
                <a-checkbox
                  :checked="!item.hide"
                  @change="()=>item.hide=!item.hide"
                />
                <span>{{ item.title }}</span>
              </div>
            </template>
          </vue-draggable>
          <a-divider class="my-[12px]" />
          <a-flex justify="flex-end">
            <a-checkbox>序号列</a-checkbox>
            <a-checkbox>列展示</a-checkbox>
          </a-flex>
        </template>
        <a-tooltip :mouse-enter-delay=".5">
          <template #title>列设置</template>
          <icon
            icon="i-ant-design:setting-outlined"
            pointer
            class="text-base"
          />
        </a-tooltip>
      </a-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
