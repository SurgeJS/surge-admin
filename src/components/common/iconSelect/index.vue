<script lang="ts" setup>
import { ref } from 'vue'
import { InputGroup } from 'ant-design-vue'
import { IconSelectProps } from '@/components/common/iconSelect/type'

withDefaults(defineProps<IconSelectProps>(),{
  icons: () => [],
  defaultCount: 50
})

const inputGroupRef = ref<InstanceType<typeof InputGroup> | null>()
const scrollContainerRef = ref<HTMLDivElement | null>()
const width = ref<string>()

const popoverChange = (visible: boolean) => {
  if (!visible) return
  width.value = `${ inputGroupRef.value?.$el.clientWidth }px`
}
</script>

<template>
  <a-popover
      @open-change="popoverChange"
      :overlayStyle="{width}"
      autoAdjustOverflow
      placement="bottomRight"
      trigger="click">
    <a-input-group ref="inputGroupRef" compact>
      <a-input
          placeholder="请选择图标"
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
      <div ref="scrollContainerRef" class="max-h-[300px] p-0.5 overflow-auto grid grid-cols-[repeat(auto-fill,35px)] justify-between gap-1 relative">
        <div
            class="w-[100%] h-[35px] border border-solid border-main rounded flex-center cursor-pointer hover:border-primary"
            :key="icon"
            v-for="icon in icons">
            <svg-icon :icon="icon" size="24" />
        </div>
        <a-affix class="absolute" :offset-bottom="20" :target="() => scrollContainerRef">
          <a-button type="primary">Fixed at the top of container</a-button>
        </a-affix>
      </div>
      <a-empty v-if="!icons.length" description="暂无图标~~~~" />
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>

</style>
