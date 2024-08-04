<script lang="ts" setup>
import useAppStore from '@/store/modules/app'
import { useClipboard,useToggle } from '@vueuse/core'
import { initialAppStore } from '@/store/modules/app/initial'
import { cloneDeep } from 'lodash-es'

const appStore = useAppStore()
const clipboard = useClipboard()
const [visible,toggleVisible] = useToggle()

const copyCurrentConfig = () => {
  clipboard.copy(JSON.stringify(appStore.$state,null,4))
  toggleVisible(true)
}

const resetCurrentConfig = () => {
  appStore.$patch(cloneDeep(initialAppStore))
}
</script>

<template>
  <a-flex gap="middle" vertical>
    <a-button
      block
      type="primary"
      @click="copyCurrentConfig"
    >
      拷贝当前配置
    </a-button>
    <a-button
      block
      danger
      type="primary"
      @click="resetCurrentConfig"
    >
      重置当前配置
    </a-button>
  </a-flex>
  <a-modal
    v-model:open="visible"
    hide-cancel
    title-align="start"
  >
    <template #title>提示</template>
    复制成功，请到
    <a-button type="link">src/store/modules/app/initial.ts</a-button>
    文件中,覆盖
    <a-button type="link">initialAppStore</a-button>
    对象
  </a-modal>
</template>

<style lang="scss" scoped>

</style>
