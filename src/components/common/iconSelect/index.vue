<script lang="ts" setup>
import { ref } from 'vue'
import { InputGroup } from 'ant-design-vue'
import { IconSelectProps } from '@/components/common/iconSelect/type'
import { UseElementVisibility } from '@vueuse/components'
import { useDebounceFn } from '@vueuse/core'

const iconValue = defineModel<string>('value')

const props = withDefaults(defineProps<IconSelectProps>(),{
  icons: () => []
})

const inputGroupRef = ref<InstanceType<typeof InputGroup> | null>()
// 弹出窗口宽度
const popoverWidth = ref<string>()
// 搜索文本
const searchText = ref<string>('')
// 图标列表
const iconList = ref<string[]>(props.icons)

// 搜索图标
const searchIcon = useDebounceFn(() => {
  if (searchText.value.length === 0) return iconList.value = props.icons
  iconList.value = props.icons.filter(item => item.includes(searchText.value))
},300)

const popoverChange = (visible: boolean) => {
  if (!visible) return
  // 弹出窗口宽度 === 显示框宽度
  popoverWidth.value = `${ inputGroupRef.value?.$el.clientWidth }px`
}

// 选择图标
const selectIcon = (icon:string) => {
  iconValue.value = icon
}

</script>

<template>
  <a-popover
      :overlayStyle="{width:popoverWidth}"
      autoAdjustOverflow
      placement="bottomRight"
      trigger="click"
      @open-change="popoverChange">
    <a-input-group ref="inputGroupRef" compact>
      <a-input
          v-model:value="iconValue"
          placeholder="请选择图标"
          readonly
          style="width: calc(100% - 32px)"
      />
      <a-button>
        <template #icon>
          <svg-icon :icon="iconValue||'ant-design:more-outlined'" />
        </template>
      </a-button>
    </a-input-group>
    <template #title>
      <a-input
          v-model:value="searchText"
          @change="searchIcon"
          placeholder="请输入图标名称">
        <template #suffix>
          <i-antd:search-outlined />
        </template>
      </a-input>
    </template>
    <template #content>
      <div
          class="max-h-[300px] p-0.5 overflow-auto grid grid-cols-[repeat(auto-fill,40px)] justify-between gap-[5px]">
        <UseElementVisibility
            v-for="icon in iconList"
            :key="icon"
            :title="icon"
            @click="selectIcon(icon)"
            class="w-[100%] h-[40px] border border-solid border-main flex-center rounded cursor-pointer hover:border-primary"
            v-slot="{ isVisible }">
          <svg-icon v-show="isVisible" :icon="icon" size="22" />
        </UseElementVisibility>
      </div>
      <a-empty v-if="!iconList.length" description="没有搜索到图标" />
    </template>
  </a-popover>
</template>

<style lang="scss" scoped>

</style>
