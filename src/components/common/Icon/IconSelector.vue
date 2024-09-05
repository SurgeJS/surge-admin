<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { iconSetPrefix } from '@/assets/iconify'
import { listIcons } from '@iconify/vue'
import { useToggle } from '@vueuse/core'

const iconValue = defineModel<string>('value')

const [ visible, setVisible ] = useToggle()

// 弹出窗口宽度
const icons = ref<string[]>(listIcons('', iconSetPrefix[0]))
const pageIcons = ref<string[]>([])
const page = ref<number>(1)
const pageSize = ref<number>(100)

// 选择图标
const selectIcon = (icon: string) => {
  iconValue.value = icon
  setVisible(false)
}

const onPageChange = () => {
  setPageIcons()
}

const onTabsChange = (key: string) => {
  icons.value = listIcons('', key)
  page.value = 1
  setPageIcons()
}

const setPageIcons = () => {
  pageIcons.value = icons.value.slice((page.value - 1) * pageSize.value, pageSize.value * page.value)
}

onBeforeMount(() => {
  setPageIcons()
})
</script>

<template>
  <a-popover
    v-model:open="visible"
    :overlay-style="{width:'500px'}"
    auto-adjust-overflow
    placement="bottomRight"
    title="图标选择器"
    trigger="click"
  >
    <a-input-group compact>
      <a-input
        v-model:value="iconValue"
        placeholder="请选择图标"
        readonly
        style="width: calc(100% - 52px)"
      />
      <a-button class="flex-center">
        <iconify-icon size="18px" :icon="iconValue||'ant-design:appstore-twotone'" />
      </a-button>
    </a-input-group>
    <template #content>
      <template v-if="iconSetPrefix.length">
        <a-tabs @change="onTabsChange">
          <a-tab-pane
            v-for="item in iconSetPrefix"
            :key="item"
            :tab="item"
          />
        </a-tabs>
        <div class="h-[300px] px-1 overflow-auto grid grid-cols-[repeat(auto-fill,40px)] justify-between gap-[5px] ">
          <div
            v-for="item in pageIcons"
            :key="item"
            class="w-[100%] h-[40px] border border-solid border-base flex-center rounded cursor-pointer hover:border-primary"
            @click="selectIcon(item)"
          >
            <iconify-icon size="20px" :icon="item" />
          </div>
        </div>
        <a-divider />
        <a-flex justify="end">
          <a-pagination
            v-model:current="page"
            v-model:page-size="pageSize"
            simple
            :total="icons.length"
            @change="onPageChange"
          />
        </a-flex>
      </template>
      <a-empty v-else description="没有图标集" />
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>

</style>
