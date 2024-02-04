<script lang="ts" setup>
import { computed,nextTick,onMounted,ref } from 'vue'
import { InputGroup,Popover } from 'ant-design-vue'
import { IconSelectProps } from '@/components/common/iconSelect/type'
import { asyncWait } from '@/utils'

const props = withDefaults(defineProps<IconSelectProps>(),{
  icons: () => [],
  autoLoadingMore: true,
  lazy: true,
  defaultCount: 200
})

const model = defineModel<string>('current')

const inputGroupRef = ref<InstanceType<typeof InputGroup> | null>()
const popoverRef = ref<InstanceType<typeof Popover> | null>()
// 图标滚动容器
const scrollContainerRef = ref<HTMLDivElement | null>()
// 弹出窗口宽度
const width = ref<string>()
// 当前渲染的图标列表
const currentIcons = ref<string[]>([])

const icons = computed(() => props.icons)

const popoverChange = (visible: boolean) => {
  if (!visible) return
  // 弹出窗口宽度 === 显示框宽度
  width.value = `${ inputGroupRef.value?.$el.clientWidth }px`
  loadMore()
}

// 加载图标
const loadIcon = () => {
  currentIcons.value.push(...icons.value.slice(0,props.defaultCount))
  icons.value.splice(0,props.defaultCount)
}

// 加载更多
const loadMore = async (isOne?: boolean) => {
  await nextTick()
  // 等待气泡弹框动画结束
  if (!isOne) await asyncWait(200)
  if (!scrollContainerRef.value) return
  const { scrollHeight,clientHeight } = scrollContainerRef.value
  if (scrollHeight > clientHeight + 100) return
  loadIcon()
  await loadMore(true)
}

onMounted(() => {
  loadIcon()
})
</script>

<template>
  <a-popover
      ref="popoverRef"
      @open-change="popoverChange"
      :overlayStyle="{width}"
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
        <div
            class="w-[100%] h-[35px] border border-solid border-main flex-center rounded cursor-pointer hover:border-primary"
            :key="icon"
            v-for="icon in currentIcons">
          <!--          <UseElementVisibility class="w-h-full flex-center" v-slot="{ isVisible }">-->
          <a-tooltip destroy-tooltip-on-hide :mouse-enter-delay="0.5">
            <template #title>{{ icon }}</template>
            <svg-icon :icon="icon" size="24" />
          </a-tooltip>
          <!--          </UseElementVisibility>-->
        </div>
      </div>
      <a-empty v-if="!icons.length||!currentIcons.length" description="暂无图标~~~~" />
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>

</style>
