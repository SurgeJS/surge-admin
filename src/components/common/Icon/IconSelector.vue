<script lang="ts" setup>
import { ref } from 'vue'
import { iconSetPrefix } from '@/assets/iconify'
import { listIcons } from '@iconify/vue'
import { useToggle } from '@vueuse/core'
import { hasScrollBar } from '@/utils'

const iconValue = defineModel<string>('value')

const [ visible, setVisible ] = useToggle()
const scrollContainer = useTemplateRef<HTMLDivElement>('scrollContainer')
const { y, arrivedState } = useScroll(scrollContainer)

const icons = ref<string[]>(listIcons('', iconSetPrefix[0]))
const pageIcons = ref<string[]>([])
const lastScrollHeight = ref(0)
// 选择图标
const selectIcon = (icon: string) => {
  iconValue.value = icon
  setVisible(false)
}

const onTabsChange = (key: string) => {
  pageIcons.value = []
  lastScrollHeight.value = 0
  icons.value = listIcons('', key)
  fullContainer()
}

const fullContainer = async () => {
  await nextTick()
  if (!scrollContainer.value) return
  const hasScroll = hasScrollBar(scrollContainer.value)
  if (hasScroll) return
  loadIcon()
  await nextTick()
  await fullContainer()
}

const loadIcon = () => {
  if (pageIcons.value.length === icons.value.length) return

  pageIcons.value.push(...icons.value.slice(pageIcons.value.length, pageIcons.value.length + 100))
}

watch(() => arrivedState.bottom, () => {
  if (!arrivedState.bottom) return
  loadIcon()
})

watch(visible, () => {
  if (visible.value) {
    nextTick(() => {
      y.value = lastScrollHeight.value
    })
    fullContainer()
  } else {
    lastScrollHeight.value = y.value
  }
})
</script>

<template>
  <n-popover
    v-model:show="visible"
    width="trigger"
    trigger="click"
  >
    <template #trigger>
      <n-input-group>
        <n-input
          v-model:value="iconValue"
          placeholder="请选择图标"
          readonly
          style="width: calc(100% - 52px)"
        />
        <n-button
          class="flex-1"
          :bordered="false"
          secondary
        >
          <template #icon>
            <iconify-icon size="18px" :icon="iconValue||'ant-design:appstore-twotone'" />
          </template>
        </n-button>
      </n-input-group>
    </template>
    <template v-if="iconSetPrefix.length">
      <n-tabs animated @update:value="onTabsChange">
        <n-tab-pane
          v-for="item in iconSetPrefix"
          :key="item"
          :name="item"
          :tab="item"
        />
      </n-tabs>
      <div
        ref="scrollContainer"
        class="h-[300px] px-1 overflow-auto grid grid-cols-[repeat(auto-fill,40px)] justify-between gap-[5px] "
      >
        <div
          v-for="item in pageIcons"
          :key="item"
          class="w-[100%] h-[40px] border border-solid border-base flex-center rounded cursor-pointer hover:border-primary"
          :class="item === iconValue? 'border-primary text-primary' : undefined"
          @click="selectIcon(item)"
        >
          <iconify-icon size="20px" :icon="item" />
        </div>
      </div>
    </template>
    <a-empty v-else description="没有图标集" />
  </n-popover>
</template>

<style lang="scss" scoped>

</style>
