<script lang="ts" setup>
import { computed,onMounted,ref } from 'vue'
import { InputGroup,Popover } from 'ant-design-vue'
import { IconSelectProps } from '@/components/common/iconSelect/type'

const model = defineModel<string>('current')

const props = withDefaults(defineProps<IconSelectProps>(),{
  icons: () => []
})

const inputGroupRef = ref<InstanceType<typeof InputGroup> | null>()
const popoverRef = ref<InstanceType<typeof Popover> | null>()
// 图标滚动容器
const scrollContainerRef = ref<HTMLDivElement | null>()
// 弹出窗口宽度
const popoverWidth = ref<string>()
// 当前渲染的图标列表
const currentIcons = ref<string[]>([])
const pageSize = ref<number>(0)
const icons = computed(() => props.icons)

const popoverChange = (visible: boolean) => {
  if (!visible) return
  // 弹出窗口宽度 === 显示框宽度
  popoverWidth.value = `${ inputGroupRef.value?.$el.clientWidth }px`
}

// 计算pageSize
const computePageSize = () => {
  if (!inputGroupRef.value) return
  // 弹框内边距
  const popoverPadding = 12 * 2
  // 图标块大小
  const iconSize = 35
  // 网格布局间距
  const gridGap = 5
  // 列数量
  const colCount = Math.floor((inputGroupRef.value.$el.clientWidth - popoverPadding - gridGap) / (iconSize + gridGap))
  // 行数量
  const rowCount = Math.floor((300 - gridGap) / (iconSize + gridGap))
  pageSize.value = colCount * rowCount
}

// 加载图标
const loadIcon = () => {
  currentIcons.value.push(...icons.value.slice(0,pageSize.value))
  icons.value.splice(0,pageSize.value)
}

onMounted(() => {
  computePageSize()
  loadIcon()
})
</script>

<template>
  <a-popover
      ref="popoverRef"
      @open-change="popoverChange"
      :overlayStyle="{width:popoverWidth}"
      autoAdjustOverflow
      placement="bottomRight"
      trigger="click">
    <a-input-group ref="inputGroupRef" compact>
      <a-input
          placeholder="请选择图标"
          v-model:value="model"
          readonly
          style="width: calc(100% - 32px)"
      />
      <a-button>
        <template #icon>
          <svg-icon icon="ant-design:account-book-filled" />
        </template>
      </a-button>
    </a-input-group>
    <template #title>
      <a-input placeholder="请输入图标名称">
        <template #suffix>
          <i-antd:search-outlined />
        </template>
      </a-input>
    </template>
    <template #content>
      <div
          ref="scrollContainerRef"
          class="max-h-[300px] p-0.5 overflow-auto grid grid-cols-[repeat(auto-fill,35px)] justify-between gap-[5px] relative">
        <span
            :title="icon"
            :key="icon"
            v-for="icon in currentIcons"
            class="w-[100%] h-[35px] border border-solid border-main flex-center rounded cursor-pointer hover:border-primary">
          <svg-icon :icon="icon" size="24" />
        </span>
      </div>
      <div class="p-[10px] flex justify-end">
        <a-pagination v-model:page-size="pageSize" :total="icons.length" show-less-items :show-size-changer="false" />
      </div>
      <!--      <a-empty v-if="!icons.length||!currentIcons.length" description="暂无图标~~~~" />-->
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>

</style>
