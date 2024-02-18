<script lang="ts" setup>
import { ref } from 'vue'
import { InputGroup,Popover } from 'ant-design-vue'
import { IconSelectProps } from '@/components/common/iconSelect/type'
import { UseElementVisibility } from '@vueuse/components'

const model = defineModel<string>('current')

withDefaults(defineProps<IconSelectProps>(),{
  icons: () => []
})

const inputGroupRef = ref<InstanceType<typeof InputGroup> | null>()
const popoverRef = ref<InstanceType<typeof Popover> | null>()
// 弹出窗口宽度
const popoverWidth = ref<string>()

const popoverChange = (visible: boolean) => {
  if (!visible) return
  // 弹出窗口宽度 === 显示框宽度
  popoverWidth.value = `${ inputGroupRef.value?.$el.clientWidth }px`
}

</script>

<template>
  <a-popover
      ref="popoverRef"
      :overlayStyle="{width:popoverWidth}"
      autoAdjustOverflow
      placement="bottomRight"
      trigger="click"
      @open-change="popoverChange">
    <a-input-group ref="inputGroupRef" compact>
      <a-input
          v-model:value="model"
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
      <div
          class="max-h-[300px] p-0.5 overflow-auto">
        <UseElementVisibility
            v-slot="{ isVisible }"
            class=" grid grid-cols-[repeat(auto-fill,40px)] justify-between gap-[5px]">
          <span
              v-for="icon in icons"

              :key="icon"
              :title="icon"
              class="w-[100%] h-[40px] border border-solid border-main flex-center rounded cursor-pointer hover:border-primary">
          <svg-icon v-if="isVisible" :icon="icon" size="22" />
        </span>
        </UseElementVisibility>
      </div>
      <!--      <a-empty v-if="!icons.length||!currentIcons.length" description="暂无图标~~~~" />-->
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>

</style>
